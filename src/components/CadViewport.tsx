import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { Layers, Pause, Play, RotateCcw } from 'lucide-react';

interface CadViewportProps {
  src: string;
  label: string;
}

export function CadViewport({ src, label }: CadViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialCamPos = useRef<THREE.Vector3>(new THREE.Vector3(2.05, 1.38, 2.25));
  const modelRootRef = useRef<THREE.Group | null>(null);

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [autoRotate, setAutoRotate] = useState(true);
  const [xrayMode, setXrayMode] = useState(false);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    const root = modelRootRef.current;
    if (!root) return;

    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.wireframe = xrayMode;
            m.transparent = xrayMode;
            m.opacity = xrayMode ? 0.35 : 1;
            m.needsUpdate = true;
          }
        });
      }
    });
  }, [xrayMode]);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    let disposed = false;
    let animId = 0;
    const abortController = new AbortController();

    setStatus('loading');
    setXrayMode(false);

    const scene = new THREE.Scene();
    const width = host.clientWidth || 640;
    const height = host.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.01, 200);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setStatus('error');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.innerHTML = '';
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    const stopAutoOnInteract = () => setAutoRotate(false);
    controls.addEventListener('start', stopAutoOnInteract);

    const hemi = new THREE.HemisphereLight(0xf1f5f2, 0x333333, 2.0);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7a9f84, 0.85);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    fetch(src, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch CAD model');
        return res.arrayBuffer();
      })
      .then((buffer) =>
        loader.parseAsync(buffer, src.substring(0, src.lastIndexOf('/') + 1))
      )
      .then((gltf) => {
        if (disposed) return;
        const root = gltf.scene;
        modelRootRef.current = root;

        const box = new THREE.Box3().setFromObject(root);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const scale = sphere.radius > 0 ? 1.15 / sphere.radius : 1;
        root.scale.setScalar(scale);

        const scaledBox = new THREE.Box3().setFromObject(root);
        const center = scaledBox.getCenter(new THREE.Vector3());
        root.position.sub(center);

        const edgeGroup = new THREE.Group();
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: 0xddd2d0,
          transparent: true,
          opacity: 0.2,
        });

        root.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.geometry) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => {
              if (m instanceof THREE.MeshStandardMaterial) {
                m.roughness = Math.min(0.78, Math.max(0.3, m.roughness));
                m.metalness = Math.min(0.35, m.metalness);
                m.polygonOffset = true;
                m.polygonOffsetFactor = 1;
                m.polygonOffsetUnits = 1;
              }
            });

            try {
              const edgesGeo = new THREE.EdgesGeometry(obj.geometry, 32);
              const line = new THREE.LineSegments(edgesGeo, edgeMaterial);
              line.applyMatrix4(obj.matrixWorld);
              edgeGroup.add(line);
            } catch {
              // Ignore edge extraction edge cases
            }
          }
        });

        root.updateMatrixWorld(true);
        edgeGroup.position.copy(root.position);

        scene.add(root);
        scene.add(edgeGroup);

        const camPos = new THREE.Vector3(2.05, 1.38, 2.25);
        initialCamPos.current.copy(camPos);
        camera.position.copy(camPos);
        controls.target.set(0, 0, 0);
        controls.minDistance = 0.9;
        controls.maxDistance = 6.0;
        controls.update();

        setStatus('ready');
      })
      .catch(() => {
        if (!disposed) setStatus('error');
      });

    const resizeObserver = new ResizeObserver(() => {
      if (!host || disposed) return;
      const w = host.clientWidth || 640;
      const h = host.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(host);

    const animate = () => {
      if (disposed) return;
      animId = window.requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      abortController.abort();
      window.cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', stopAutoOnInteract);
      controls.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry?.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m?.dispose());
        }
      });
      renderer.dispose();
    };
  }, [src]);

  const handleReset = () => {
    const cam = cameraRef.current;
    const ctrls = controlsRef.current;
    if (!cam || !ctrls) return;
    cam.position.copy(initialCamPos.current);
    ctrls.target.set(0, 0, 0);
    ctrls.update();
    setXrayMode(false);
    setAutoRotate(true);
  };

  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-lg border border-ink/15 bg-inset select-none sm:h-[430px]">
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        aria-label={label}
      />

      {status === 'loading' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-inset">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink/25 border-t-accent" />
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-inset px-6 text-center text-xs text-ink/75">
          3D preview unavailable in this browser.
        </div>
      )}

      {status === 'ready' && (
        <div className="absolute right-3 bottom-3 z-10 flex items-center gap-1.5 rounded-md border border-ink/15 bg-deep/90 px-2 py-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] transition ${
              autoRotate ? 'text-accent' : 'text-ink/80 hover:text-white'
            }`}
            title="Toggle rotation"
          >
            {autoRotate ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>Rotate</span>
          </button>
          <span className="text-ink/20">|</span>
          <button
            type="button"
            onClick={() => setXrayMode((v) => !v)}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] transition ${
              xrayMode ? 'text-accent' : 'text-ink/80 hover:text-white'
            }`}
            title="Toggle wireframe"
          >
            <Layers className="h-3 w-3" />
            <span>Wireframe</span>
          </button>
          <span className="text-ink/20">|</span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] text-ink/80 transition hover:text-white"
            title="Reset view"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      )}
    </div>
  );
}
