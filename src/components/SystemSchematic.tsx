import { useState } from 'react';
import type { SchematicId } from '../data/portfolioData';

interface SchematicNode {
  id: string;
  title: string;
  role: string;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SchematicEdge {
  from: [number, number];
  to: [number, number];
  label?: string;
  labelPos?: [number, number];
  dashed?: boolean;
}

interface SchematicDefinition {
  heading: string;
  nodes: SchematicNode[];
  edges: SchematicEdge[];
}

const SCHEMATICS: Record<SchematicId, SchematicDefinition> = {
  spoiler: {
    heading: 'Dual-ESP32 Compute Partitioning & Real-Time Bus Topology',
    nodes: [
      {
        id: 'imu-ui',
        title: 'MPU6050 + Wi-Fi UI',
        role: '100 Hz I²C + Async HTTP',
        detail:
          'Variable-latency network traffic and attitude sampling are isolated away from the motor controller.',
        x: 24,
        y: 34,
        w: 195,
        h: 68,
      },
      {
        id: 'esp32-n2',
        title: 'ESP32 Node N2 (Compute)',
        role: 'Curves + 4-Bar IK Solver',
        detail:
          'Evaluates 21-point roll/pitch response curves and closed-form four-bar inverse kinematics, streaming 50 Hz target frames.',
        x: 24,
        y: 148,
        w: 195,
        h: 68,
      },
      {
        id: 'esp32-n1',
        title: 'ESP32 Node N1 (Real-Time)',
        role: '4× 1 kHz PID + Watchdog',
        detail:
          'Zero Wi-Fi overhead: runs four deterministic 1 kHz PID servo loops and disarms within 300 ms on any CRC or encoder fault.',
        x: 302,
        y: 90,
        w: 205,
        h: 72,
      },
      {
        id: 'bridges',
        title: 'Quad PWM Motor Stage',
        role: '19.5 kHz · 12-Bit PWM',
        detail:
          'Drives independent left and right four-bar wing actuators with hardware fault latching.',
        x: 576,
        y: 34,
        w: 200,
        h: 68,
      },
      {
        id: 'encoders',
        title: '4× MT6701 Encoders',
        role: '14-Bit · Dual I²C (0.022°)',
        detail:
          'Continuous absolute angular feedback across two hardware I²C buses closes all four 1 kHz position loops.',
        x: 576,
        y: 148,
        w: 200,
        h: 68,
      },
    ],
    edges: [
      { from: [121, 102], to: [121, 148], label: '100 Hz IMU', labelPos: [121, 125] },
      { from: [219, 182], to: [302, 134], label: '50 Hz CRC UART', labelPos: [262, 166] },
      { from: [507, 114], to: [576, 68], label: '4× PWM', labelPos: [540, 82] },
      { from: [576, 182], to: [507, 140], label: 'Dual I²C', labelPos: [542, 170], dashed: true },
    ],
  },
  lara: {
    heading: 'L.A.R.A. Kinematic Simulation & Pose-Tracking Loop',
    nodes: [
      {
        id: 'isaac',
        title: 'NVIDIA Isaac Sim',
        role: '6-DoF Digital Twin',
        detail:
          'Verifies workspace reachability, joint clearances, and internal harness routing prior to physical runs.',
        x: 28,
        y: 36,
        w: 195,
        h: 68,
      },
      {
        id: 'fiducials',
        title: 'AprilTag 41h12 Suite',
        role: '12× 20 mm Joint Markers',
        detail:
          'Dual-face 600 DPI fiducials measure actual link orientation to quantify gear backlash and compliance.',
        x: 28,
        y: 148,
        w: 195,
        h: 68,
      },
      {
        id: 'error-model',
        title: 'Error Compensation',
        role: 'Stochastic Trajectory Fit',
        detail:
          'Models systematic and stochastic tracking deviations to pre-compensate joint position targets.',
        x: 300,
        y: 92,
        w: 200,
        h: 68,
      },
      {
        id: 'arm-hw',
        title: '6-Axis Arm + Tool Lock',
        role: 'Passive 50 mm Cam Coupler',
        detail:
          'Modular 6-DoF manipulator paired with a zero-actuator rail-driven radial-dog tool swapper.',
        x: 572,
        y: 92,
        w: 200,
        h: 68,
      },
    ],
    edges: [
      { from: [223, 70], to: [300, 114], label: 'Target θ(t)', labelPos: [262, 82] },
      { from: [223, 182], to: [300, 138], label: 'Measured Pose', labelPos: [262, 172], dashed: true },
      { from: [500, 126], to: [572, 126], label: ' Joint Cmd', labelPos: [536, 114] },
    ],
  },
  kinect: {
    heading: 'Kinect 360 C USB Driver & Spatial Audio Pipeline',
    nodes: [
      {
        id: 'hw',
        title: 'Kinect 360 Sensor',
        role: 'RGB-D + 4-Capsule Array',
        detail:
          'Structured-light IR depth projector, 640×480 RGB camera, and 4-channel linear microphone array.',
        x: 26,
        y: 90,
        w: 190,
        h: 68,
      },
      {
        id: 'bridge',
        title: 'kinect_bridge.c',
        role: 'libfreenect / libusb IPC',
        detail:
          'Uploads audios.bin DSP firmware, manages USB isochronous resync, and emits framed binary packets.',
        x: 294,
        y: 90,
        w: 205,
        h: 68,
      },
      {
        id: 'doa',
        title: 'TDOA + Vision Engine',
        role: '30 fps Depth & Azimuth',
        detail:
          'Computes cross-correlation speaker direction-of-arrival alongside live depth segmentation (<500 ms latency).',
        x: 572,
        y: 90,
        w: 202,
        h: 68,
      },
    ],
    edges: [
      { from: [216, 124], to: [294, 124], label: 'USB Isochronous', labelPos: [255, 110] },
      { from: [499, 124], to: [572, 124], label: 'Binary Pipe', labelPos: [536, 110] },
    ],
  },
  tekkai: {
    heading: 'Tekkai 2.0 Deterministic Arbitration State Machine',
    nodes: [
      {
        id: 'sonar',
        title: '3× Ultrasonic Array',
        role: 'Left / Center / Right (<40 cm)',
        detail:
          'Directional opponent detection takes top priority during active pushes and biases search spin direction.',
        x: 26,
        y: 36,
        w: 195,
        h: 68,
      },
      {
        id: 'edge',
        title: '2× IR Edge Sensors',
        role: '2-Sample Debounce Filter',
        detail:
          'Consecutive-sample confirmation eliminates false ring-border retreats caused by surface scratches.',
        x: 26,
        y: 148,
        w: 195,
        h: 68,
      },
      {
        id: 'fsm',
        title: 'ESP32 C++ Controller',
        role: 'Priority FSM + Wi-Fi Debug',
        detail:
          'Boots hardware-disarmed, gates execution on remote start/stop signals, and exposes live PWM telemetry.',
        x: 300,
        y: 92,
        w: 202,
        h: 68,
      },
      {
        id: 'drive',
        title: '4WD Brushed Drivetrain',
        role: 'Hardware-Gated H-Bridge',
        detail:
          'High-traction four-motor wedge chassis executing pursuit, timed reverse, and directional search.',
        x: 574,
        y: 92,
        w: 200,
        h: 68,
      },
    ],
    edges: [
      { from: [221, 70], to: [300, 114], label: 'Lock Priority', labelPos: [260, 82] },
      { from: [221, 182], to: [300, 138], label: 'Debounced IR', labelPos: [260, 172] },
      { from: [502, 126], to: [574, 126], label: 'PWM + EN', labelPos: [538, 114] },
    ],
  },
  hydroponics: {
    heading: 'Closed-Loop Vision & Microclimate Control Stack',
    nodes: [
      {
        id: 'cam',
        title: 'Leaf Imaging Feed',
        role: '224×224 Preprocessing',
        detail:
          'Captures and normalizes crop foliage imagery across three hydroponic cultivation channels.',
        x: 26,
        y: 36,
        w: 195,
        h: 68,
      },
      {
        id: 'sensors',
        title: 'Climate & Nutrient Suite',
        role: 'Temp · Humidity · Level',
        detail:
          'Continuous environmental telemetry sampled by the onboard ESP32 controller.',
        x: 26,
        y: 148,
        w: 195,
        h: 68,
      },
      {
        id: 'vision',
        title: 'EfficientNet-B0 (PyTorch)',
        role: 'Foliar Pathology Classifier',
        detail:
          'Transfer-learned binary classification head flagging early lettuce disease states.',
        x: 300,
        y: 36,
        w: 204,
        h: 68,
      },
      {
        id: 'esp',
        title: 'ESP32 Actuation Loop',
        role: 'Pumps · Dosing · Spectrum',
        detail:
          'Regulates irrigation cycles, nutrient feeders, ventilation, and grow-light schedules.',
        x: 300,
        y: 148,
        w: 204,
        h: 68,
      },
      {
        id: 'greenhouse',
        title: '2×1×1 m Greenhouse',
        role: '3 Hydroponic Geometries',
        detail:
          'Integrated NFT, vertical, and deep-water rigs — 1st Place at the National STEM Competition.',
        x: 576,
        y: 92,
        w: 198,
        h: 68,
      },
    ],
    edges: [
      { from: [221, 70], to: [300, 70] },
      { from: [221, 182], to: [300, 182] },
      { from: [504, 70], to: [576, 114] },
      { from: [504, 182], to: [576, 138] },
    ],
  },
};

export function SystemSchematic({ schematicId }: { schematicId: SchematicId }) {
  const spec = SCHEMATICS[schematicId];
  const [activeNodeId, setActiveNodeId] = useState<string>(spec.nodes[0].id);

  const selectedNode =
    spec.nodes.find((n) => n.id === activeNodeId) ?? spec.nodes[0];

  return (
    <div className="flex flex-col justify-between rounded-lg border border-ink/15 bg-surface p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-ink/90">
          {spec.heading}
        </span>
      </div>

      <div className="overflow-x-auto py-1">
        <svg
          viewBox="0 0 800 246"
          className="mx-auto w-full min-w-[540px] select-none"
          role="img"
          aria-label={spec.heading}
        >
          <defs>
            <marker
              id={`arrow-${schematicId}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-accent)" />
            </marker>
          </defs>

          {spec.edges.map((edge, idx) => {
            const [x1, y1] = edge.from;
            const [x2, y2] = edge.to;
            const midX = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
            return (
              <g key={idx}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeOpacity={0.45}
                  strokeWidth={1.5}
                  strokeDasharray={edge.dashed ? '4 4' : undefined}
                  markerEnd={`url(#arrow-${schematicId})`}
                />
                {edge.label && edge.labelPos && (
                  <g transform={`translate(${edge.labelPos[0]}, ${edge.labelPos[1]})`}>
                    <rect
                      x={-52}
                      y={-9}
                      width={104}
                      height={16}
                      rx={3}
                      fill="var(--color-edge)"
                    />
                    <text
                      x={0}
                      y={2}
                      textAnchor="middle"
                      fill="var(--color-ink)"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {spec.nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                className="cursor-pointer"
              >
                <rect
                  width={node.w}
                  height={node.h}
                  rx={6}
                  fill={isSelected ? 'var(--color-surface-hover)' : 'var(--color-inset)'}
                  stroke={isSelected ? 'var(--color-accent)' : 'rgba(212, 221, 215, 0.22)'}
                  strokeWidth={isSelected ? 1.75 : 1}
                />
                {isSelected && (
                  <rect x={0} y={0} width={3} height={node.h} rx={1.5} fill="var(--color-accent)" />
                )}
                <text
                  x={12}
                  y={28}
                  fill="var(--color-ink-strong)"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="Space Grotesk, Inter, sans-serif"
                >
                  {node.title}
                </text>
                <text
                  x={12}
                  y={48}
                  fill="var(--color-ink)"
                  fillOpacity={0.78}
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 border-t border-ink/12 pt-2.5 text-xs leading-relaxed text-ink/90">
        <span className="font-medium text-ink-strong">{selectedNode.title}:</span>{' '}
        {selectedNode.detail}
      </div>
    </div>
  );
}
