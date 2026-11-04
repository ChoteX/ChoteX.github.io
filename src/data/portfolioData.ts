export type SchematicId = 'spoiler' | 'lara' | 'kinect' | 'tekkai' | 'hydroponics';

export type ProjectIconId =
  | 'bot'
  | 'cpu'
  | 'radar'
  | 'scale'
  | 'shield'
  | 'swords'
  | 'gauge'
  | 'server'
  | 'network'
  | 'trophy'
  | 'magnet'
  | 'waves'
  | 'sprout';

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectPresentation {
  src: string;
  label: string;
  slideCount: number;
}

export interface ProjectDetailSection {
  title: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  icon: ProjectIconId;
  year: string;
  title: string;
  context: string;
  summary: string;
  details: string[];
  tags: string[];
  images?: ProjectImage[];
  presentationPdf?: ProjectPresentation;
  detailSections?: ProjectDetailSection[];
  cadModel?: {
    src: string;
    label: string;
  };
  schematicId?: SchematicId;
  defaultMode?: 'cad' | 'photo' | 'schematic';
  githubUrl?: string;
  secondaryGithub?: {
    label: string;
    url: string;
  };
  sherekilebiLab?: boolean;
}

export interface TimelineLogo {
  src: string;
  alt: string;
  bg: 'white' | 'dark' | 'cream' | 'none';
  borderless?: boolean;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  organizationUrl?: string;
  summary: string;
  logo: TimelineLogo;
}

export type SkillIconId =
  | 'embedded'
  | 'isaac-sim'
  | 'pytorch'
  | 'fusion'
  | 'blender'
  | 'ansys'
  | 'kicad'
  | 'matlab'
  | 'raspberry-pi'
  | 'mqtt';

export interface HighLevelSkill {
  id: SkillIconId;
  name: string;
}

export interface Profile {
  name: string;
  heroName: string;
  email: string;
  github: string;
  linkedin: string;
  sherekilebiWebsite: string;
  cvUrl: string;
}

export const PROFILE: Profile = {
  name: 'Dachi Tchotashvili',
  heroName: 'Dachi Tchotashvili',
  email: 'Dachi.Tchotashvili@mbzuai.ac.ae',
  github: 'https://github.com/ChoteX',
  linkedin: 'https://www.linkedin.com/in/dachiko',
  sherekilebiWebsite: 'https://sherekilebi-labs.github.io/',
  cvUrl: './Dachi_Tchotashvili_CV.pdf',
};

// Strictly sorted by most recent first
const ALL_PROJECTS: ProjectItem[] = [
  {
    id: 'lara',
    icon: 'bot',
    year: 'Aug 2026 - In development',
    title: 'Lab Assistant Robot Arm (L.A.R.A.)',
    context: 'MBZUAI Robotics Research & Sherekilebi Labs',
    summary:
      'Research case study in simulation and robot-control software for low-cost robotic actuators, built around a modular 6-DoF manipulator in NVIDIA Isaac Sim. Its mechanical structure, electronics, actuators, and passive tool changer were prototyped at Sherekilebi Labs as the physical platform for the study.',
    details: [
      'Research and hardware details are grouped below.',
    ],
    detailSections: [
      {
        title: 'Research case study',
        items: [
          'Built the full 6-DoF kinematic model, internal cable routing, and trajectory experiments in NVIDIA Isaac Sim for a low-cost robotic actuator platform.',
          'Developed Python tooling that generates and verifies 600 DPI AprilTag joint fiducials, then compares commanded motion with measured link pose.',
          'Designing robot-control experiments to characterize stochastic gear backlash and tracking error for feedforward target compensation.',
        ],
      },
      {
        title: 'Sherekilebi Labs hardware platform',
        items: [
          'Prototyped the mechanical links, joints, electronics, actuators, internal cable routing, and passive cam-lock tool changer at Sherekilebi Labs.',
          'Bench-tested the v1 arm joint by joint and fabricated the updated v2 structural architecture used as the physical research case-study platform.',
        ],
      },
    ],
    tags: ['Robotics', 'Isaac Sim', 'AprilTag Vision', 'Python', '6-DoF Kinematics', 'Fusion 360'],
    images: [
      {
        src: './media/Lara icon.png',
        alt: 'L.A.R.A. six-axis robot arm illustration',
        caption: 'L.A.R.A. six-axis robot arm concept with the passive tool-changing gripper.',
      },
    ],
    cadModel: {
      src: './media/models/lara.glb',
      label: 'L.A.R.A. 6-Axis Assembly',
    },
    schematicId: 'lara',
    defaultMode: 'cad',
    sherekilebiLab: true,
  },
  {
    id: 'active-spoiler',
    icon: 'cpu',
    year: 'Jul 2026',
    title: 'Active Aero System Prototype',
    context: 'Embedded C++ · Real-Time Compute Partitioning',
    summary:
      'Distributed dual-ESP32 C++ software architecture partitioning sensor fusion, inverse kinematics, and telemetry away from hard real-time motor control to achieve deterministic 1 kHz response and 0.022° angular accuracy on a split active rear wing.',
    details: [
      'Partitioned workloads across two ESP32s so Wi-Fi/TCP interrupts never stall actuation: Node N2 runs 100 Hz IMU sampling, 21-point attitude curve interpolation, closed-form planar four-bar inverse kinematics, and the local HTTP tuning UI.',
      'Dedicated Node N1 exclusively to hard real-time control, executing four synchronized 1 kHz PID position loops driving 19.5 kHz 12-bit PWM bridges with feedback from four 14-bit MT6701 magnetic encoders across dual I²C buses.',
      'Designed a low-overhead 50 Hz CRC-checked binary UART protocol between the two microcontrollers with a 300 ms hardware watchdog that immediately disarms all four drives upon encoder dropout or link timeout.',
      'Calibrated pitch air-braking and roll-compensated cornering curves against Ansys CFD aerodynamic load models (300 ± 20 N drag force at 150 km/h, 60° deployment).',
    ],
    tags: ['CFD Analysis', 'C++', 'ESP32', 'PID', 'Inverse Kinematics', 'UART CRC', 'PlatformIO'],
    images: [
      {
        src: './media/Spoiler Simulation.png',
        alt: 'CFD airflow simulation focused on the active rear spoiler',
        caption:
          'CFD airflow simulation showing the active rear spoiler and the surrounding flow field.',
      },
    ],
    schematicId: 'spoiler',
    githubUrl: 'https://github.com/Sherekilebi-labs/Active-Spoiler',
    sherekilebiLab: true,
  },
  {
    id: 'kinect-suite',
    icon: 'radar',
    year: 'Jul 2026',
    title: 'Kinect 360 C Driver & Acoustic DOA',
    context: 'Low-Level C Systems & Sensor Fusion',
    summary:
      'Custom C libfreenect USB bridge multiplexing synchronized 30 fps RGB-D depth streams with 4-channel microphone time-difference-of-arrival localization for sub-500 ms spatial automations.',
    details: [
      'Wrote kinect_bridge.c in C to upload UAC audio DSP firmware (audios.bin), recover libusb isochronous transfers, and stream RGB, 11-bit depth, and 4-mic audio over framed binary pipes.',
      'Implemented cross-correlation time-difference-of-arrival (TDOA) acoustic localization with adaptive RMS noise-floor calibration to estimate speaker azimuth and confidence in real time.',
      'Paired with a 30 fps OpenCV diagnostic UI and an RTX 3070 local inference node for low-latency voice and gesture control.',
    ],
    tags: ['C', 'libfreenect', 'USB Drivers', 'Acoustic TDOA', 'OpenCV', 'Python'],
    images: [
      {
        src: './media/kinect-camera.webp',
        alt: 'Kinect 360 connected to live RGB-D depth segmentation and stream telemetry UI',
        caption: 'Live structured-light depth map, RGB stream, and USB packet diagnostics.',
      },
    ],
    schematicId: 'kinect',
    sherekilebiLab: true,
  },
  {
    id: 'gym-scale',
    icon: 'scale',
    year: 'Jul 2026',
    title: 'BLE Smart Scale & Kalman Denoiser',
    context: 'ESP32 C++ · Embedded Filtering & Flutter UI',
    summary:
      'HX711 load-cell firmware running cascaded median-window and Kalman denoising on ESP32, streaming versioned 16-byte BLE packets at 5 Hz to an offline-SQLite Flutter mobile app.',
    details: [
      'Eliminated strain-gauge spike noise prior to Kalman state estimation and designed a compact binary BLE GATT telemetry protocol.',
      'Built a companion Flutter mobile interface with live gram readout, tare/mode switching, and local SQLite macro-nutrient logging.',
    ],
    tags: ['C++', 'ESP32', 'Kalman Filter', 'BLE', 'Flutter', 'SQLite'],
    images: [
      {
        src: './media/gym-scale.webp',
        alt: 'Custom 3D-printed BLE smart weighing scale',
        caption: '3D-printed strain-gauge weighing platform with onboard ESP32 BLE controller.',
      },
      {
        src: './media/gym-scale-ui.png',
        alt: 'Flutter mobile app UI for the BLE smart scale showing live gram readout, tare/mode controls, and nutrition breakdown',
        caption: 'Companion Flutter mobile interface displaying real-time BLE weight telemetry and nutrition tracking.',
      },
    ],
    githubUrl: 'https://github.com/Sherekilebi-labs/GYM-scale',
    sherekilebiLab: true,
  },
  {
    id: 'door-security',
    icon: 'shield',
    year: 'Jul 2026',
    title: 'Door Security & IMU Tamper Monitor',
    context: 'ESP32 C++ · Dual-Sensor Access Node',
    summary:
      'ESP32 controller combining 38 kHz NEC-modulated infrared beam-break detection with calibrated MPU6050 tamper latching, bounded event logging, and a local web arming console.',
    details: [
      'Fuses 350 ms confirmed optical beam interruption with 250 ms IMU tilt/impact thresholds to prevent false alarms while catching enclosure tampering.',
    ],
    tags: ['C++', 'ESP32', 'NEC Infrared', 'MPU6050'],
    images: [
      {
        src: './media/cat-testing-door-security.webp',
        alt: 'Doorway infrared beam sensor test at Sherekilebi Labs',
        caption: 'Live doorway beam-break verification at Sherekilebi Labs.',
      },
    ],
    githubUrl: 'https://github.com/Sherekilebi-labs/Door-Security-System',
    sherekilebiLab: true,
  },
  {
    id: 'tekkai-2',
    icon: 'swords',
    year: 'Jun 2026',
    title: 'Tekkai v2 — Autonomous Sumo Robot',
    context: 'ESP32 C++ · Deterministic State Machine',
    summary:
      'Four-wheel-drive autonomous combat robot running target-priority ESP32 C++ firmware with tri-ultrasonic pursuit, debounced IR ring-edge evasion, and onboard Wi-Fi telemetry.',
    details: [
      'Implemented deterministic combat arbitration in C++: active ultrasonic locks (<40 cm across left/center/right channels) override edge checks during pushes while preserving last-seen opponent direction for spin search.',
      'Added consecutive two-sample debounce filtering on downward IR reflectance sensors to prevent false boundary retreats from ring surface scratches.',
      'Engineered hardware-disarmed startup, remote start/stop gating, and a local Wi-Fi diagnostics page for safe pit testing.',
    ],
    tags: ['C++', 'ESP32', 'State Machines', 'Sensor Fusion', 'Autonomous Robotics'],
    images: [
      {
        src: './media/sumo2026-robot.webp',
        alt: 'Tekkai 2.0 4WD autonomous sumo robot chassis and ESP32 electronics',
        caption: 'Tekkai 2.0 four-wheel-drive drivetrain and ESP32 control stack.',
      },
    ],
    cadModel: {
      src: './media/models/sumo-2026.glb',
      label: 'Tekkai 2.0 Chassis',
    },
    schematicId: 'tekkai',
    githubUrl: 'https://github.com/Sherekilebi-labs/Tekkai-2.0',
    secondaryGithub: {
      label: '2024 v1 Repo',
      url: 'https://github.com/ChoteX/RoboSumo-2024',
    },
    sherekilebiLab: true,
  },
  {
    id: 'cupexs-racer',
    icon: 'gauge',
    year: 'Jun 2026',
    title: 'CupExS Drag Racer & Inertial Dyno',
    context: 'ESP32 C++ · System Identification',
    summary:
      'Experimental physics platform combining a 20 kHz PWM ESP32 drag car, a 2-lane 36 kHz IR photogate timer, an MT6701 + ACS712 inertial motor dynamometer, and nonlinear drivetrain modeling.',
    details: [
      'Built 5 standardized kits pairing high-frequency motor PWM control and optical timing gates with automated Python nonlinear least-squares torque/friction characterization.',
    ],
    tags: ['C++', 'ESP32', 'MT6701', 'ACS712 Dyno', 'System ID'],
    images: [
      {
        src: './media/cupexs-car.webp',
        alt: 'CupExS modular drag racer chassis with GT2 belt drivetrain',
        caption: 'Modular ESP32 drag car chassis built for drivetrain and gear-ratio experiments.',
      },
    ],
    githubUrl: 'https://github.com/Sherekilebi-labs/CupExS-drag-racer',
    sherekilebiLab: true,
  },
  {
    id: 'sherekilebi-hub-infra',
    icon: 'server',
    year: 'Jun 2026',
    title: 'Sherekilebi HUB Linux & GPU Server',
    context: 'Systems Administration & Self-Hosted Compute',
    summary:
      'Split-compute lab infrastructure pairing a hardened 24/7 Ubuntu Server controller (Tailscale mesh, Docker Compose, MQTT, automated PostgreSQL backups) with a Wake-on-LAN RTX 3070 node.',
    details: [
      'Isolates continuous low-power IoT/database services from on-demand GPU inference workloads accessible securely over private WireGuard/Tailscale routing.',
    ],
    tags: ['Linux', 'Docker', 'Tailscale', 'MQTT', 'PostgreSQL'],
    sherekilebiLab: true,
  },
  {
    id: 'terminator-bot',
    icon: 'network',
    year: 'May 2026',
    title: 'Terminator — Graph-Theoretic Agent',
    context: 'MBZUAI · 55.00 / 55.00 Automated Evaluation',
    summary:
      'Zero-dependency Python tactical arena agent combining multi-source BFS reachability, shortlisted A* trap validation, timed-wall ETA tracking, and Tarjan block-cut tree dynamic programming.',
    details: [
      'Decomposed grid survival and territory capture into biconnected components via Tarjan’s algorithm to compute optimal endgame paths in O(n log n) per turn.',
    ],
    tags: ['A* Search', 'Tarjan Block-Cut DP', 'Graph Algorithms'],
  },
  {
    id: 'pythagora-wro',
    icon: 'trophy',
    year: 'Nov 2023',
    title: 'Pythagora v3 — WRO Autonomous Robot',
    context: 'World Robot Olympiad · National 1st & World Bronze',
    summary:
      'High-speed autonomous competition robot built with LEGO Mindstorms robotics kit and programmed in RobotC. Uses multi-sensor PID trajectory tracking and junction state machines to complete a full-score run in 0:59 out of 2:00.',
    details: [
      'Won 1st Place Overall at the Georgian National Championship and earned an International Bronze Medal representing Georgia at WRO 2023.',
    ],
    tags: ['Autonomous Robotics', 'PID Control', 'Path Planning'],
    images: [
      {
        src: './media/wro.jpg',
        alt: 'Pythagora v3 WRO competition robot',
        caption: 'Pythagora v3 — WRO National Winner and International Bronze Medalist.',
      },
    ],
    githubUrl: 'https://github.com/ChoteX/WRO2023',
  },
  {
    id: 'magneto-oscillator',
    icon: 'magnet',
    year: 'Jul 2023',
    title: 'Magneto-Mechanical Oscillator',
    context: 'Computational Physics · IYPT National 1st Place',
    summary:
      'MATLAB numerical simulation of coupled Euler–Bernoulli cantilever mechanics and nonlinear magnetic dipole interactions, validated against optical phase-space tracking.',
    details: [
      'Modeled frequency-locking, bending dynamics, and energy transfer regimes between coupled elastic-magnetic oscillators.',
    ],
    tags: ['MATLAB', 'Differential Equations', 'Nonlinear Dynamics', 'Physics'],
    images: [
      {
        src: './media/iypt1.png',
        alt: 'Magneto-mechanical coupled beam experimental setup',
        caption: 'Experimental apparatus and optical phase-space tracking setup.',
      },
    ],
    presentationPdf: {
      src: './media/magneto-mechanical-oscillator-presentation.pdf',
      label: 'Magneto-Mechanical Oscillator slide deck',
      slideCount: 41,
    },
  },
  {
    id: 'unsinkable-disk',
    icon: 'waves',
    year: 'Jul 2023',
    title: 'Unsinkable Disk Hydrodynamics',
    context: 'Fluid Mechanics Research · IYPT',
    summary:
      'Analytical and experimental Navier–Stokes modeling of radial thin-film flow regimes and circular hydraulic jumps supporting a dense metallic disk under vertical jet impingement.',
    details: [
      'Characterized critical jet-velocity and depth boundaries across three distinct hydrodynamic equilibrium regimes.',
    ],
    tags: ['Fluid Dynamics', 'Navier–Stokes', 'MATLAB', 'Experimental Physics'],
    images: [
      {
        src: './media/disk.png',
        alt: 'Circular hydraulic jump stabilizing a submerged disk',
        caption: 'Radial film flow and circular hydraulic jump keeping a heavy disk afloat.',
      },
    ],
    presentationPdf: {
      src: './media/unsinkable-disk-presentation.pdf',
      label: 'Unsinkable Disk slide deck',
      slideCount: 38,
    },
  },
  {
    id: 'smart-hydroponics',
    icon: 'sprout',
    year: 'May 2023',
    title: 'AI Smart Hydroponic Greenhouse',
    context: 'PyTorch Vision + ESP32 Control · National 1st Place',
    summary:
      'Full-scale 2 × 1 × 1 m automated greenhouse pairing a PyTorch EfficientNet-B0 plant-pathology vision pipeline with closed-loop ESP32 climate and nutrient regulation.',
    details: [
      'Fine-tuned an EfficientNet-B0 classifier in PyTorch with 224 × 224 grayscale leaf preprocessing to detect foliar disease across cultivated lettuce varieties.',
      'Programmed ESP32 control loops regulating temperature, humidity, grow-spectrum lighting, circulation pumps, and nutrient dosing across three hydroponic geometries.',
      'Led a 5-person team from mechanical fabrication to software integration in 3 weeks, winning 1st Place at the National STEM Projects Competition.',
    ],
    tags: ['PyTorch', 'EfficientNet-B0', 'Computer Vision', 'ESP32'],
    images: [
      {
        src: './media/hydroponics.png',
        alt: 'Automated 2x1x1m hydroponic greenhouse under grow lighting',
        caption: 'Completed 2 × 1 × 1 m multi-architecture greenhouse prototype.',
      },
    ],
    schematicId: 'hydroponics',
    githubUrl: 'https://github.com/ChoteX/Hydroponic-Greenhouse',
  },
  {
    id: 'sherekilebi-makerspace',
    icon: 'server',
    year: '2026 — in development',
    title: 'Sherekilebi Labs Makerspace',
    context: 'Smart makerspace & robotics lab · Sherekilebi Labs',
    summary:
      'An evolving lab system that brings a Linux hub server, Kinect 360 sensing, and door security into one shared backbone for safer, more discoverable robotics work.',
    details: [
      'Runs the Ubuntu hub, self-hosted services, GPU inference node, and internal tooling as one dependable foundation for the lab.',
      'Uses the Kinect 360 RGB-D and microphone stack to support spatial interaction, voice localization, and hands-free automations around the workspace.',
      'Adds infrared beam-break and MPU6050 tamper sensing to monitor access and protect equipment while the makerspace is unattended.',
      'Still under development as the physical space, infrastructure, and automation layer continue to converge into a single robotics lab.',
    ],
    tags: ['Linux', 'Kinect 360', 'C', 'ESP32', 'Docker', 'Robotics Lab'],
    images: [
      {
        src: './media/Lab model.png',
        alt: 'Concept model of the Sherekilebi Labs makerspace and robotics workbenches',
        caption: 'Lab model for the Sherekilebi Labs makerspace and robotics workspace.',
      },
    ],
    githubUrl: 'https://github.com/Sherekilebi-labs/Door-Security-System',
    sherekilebiLab: true,
  },
];

export const PROJECTS: ProjectItem[] = [
  'lara',
  'active-spoiler',
  'tekkai-2',
  'sherekilebi-makerspace',
  'pythagora-wro',
  'smart-hydroponics',
  'magneto-oscillator',
  'unsinkable-disk',
].map((id) => ALL_PROJECTS.find((project) => project.id === id))
  .filter((project): project is ProjectItem => Boolean(project));

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'mbzuai-research',
    period: 'Aug 2026 – Present',
    title: 'Undergraduate Robotics Researcher',
    organization: 'MBZUAI · Abu Dhabi, UAE',
    organizationUrl: 'https://mbzuai.ac.ae/',
    summary:
      'Under Prof. Jorge A. Amador Herrera, research focuses on simulation and robot-control software for low-cost robotic actuators: modeling a modular 6-DoF manipulator in NVIDIA Isaac Sim, comparing commanded and measured motion, and studying stochastic tracking error. L.A.R.A. robot arm is used as a case study to perform Sim-to-real tests',
    logo: {
      src: './media/mbzlogo.webp',
      alt: 'MBZUAI',
      bg: 'white',
    },
  },
  {
    id: 'sherekilebi-founder',
    period: 'Jun 2026 – Present',
    title: 'Founded Sherekilebi Labs',
    organization: 'Sherekilebi Labs',
    organizationUrl: 'https://sherekilebi-labs.github.io/',
    summary:
      'Built an independent peer-run robotics and hardware prototyping lab from scratch in Tbilisi equipped with 3D fabrication, SMD electronics benches, and self-hosted Linux/GPU infrastructure.',
    logo: {
      src: './media/tsatmfreni.png',
      alt: 'Sherekilebi Labs',
      bg: 'cream',
    },
  },
  {
    id: 'cupexs-2026',
    period: 'Jun 2026',
    title: 'Experimental Platform Development',
    organization: 'CupExS · Cup of Experimental Science',
    organizationUrl: 'https://cupexs.com/about-cupexs.html',
    summary:
      'Built five standardized drag-racer experiment kits for CupExS, a science tournament focused on hands-on investigation. The platform combined ESP32 motor control, optical timing gates, and a motor dynamometer to support drivetrain and gear-ratio experiments.',
    logo: {
      src: './media/cupexs-logo.webp',
      alt: 'CupExS',
      bg: 'white',
    },
  },
  {
    id: 'mbzuai-degree',
    period: '2025 – Present',
    title: 'B.Sc. in Artificial Intelligence Engineering',
    organization: 'MBZUAI · Abu Dhabi, UAE',
    organizationUrl: 'https://mbzuai.ac.ae',
    summary:
      'HH Sheikh Tahnoon Bin Zayed Merit Scholar. Treasurer and Event Organizer of the MBZUAI Robotics Club.',
    logo: {
      src: './media/mbzlogo.webp',
      alt: 'MBZUAI',
      bg: 'white',
    },
  },
  {
    id: 'eupho-committee',
    period: '2024',
    title: 'Academic Committee Member',
    organization: '8th European Physics Olympiad (EuPhO)',
    organizationUrl: 'https://eupho.ee/',
    summary:
      'Collaborated with 15 international professors to author and calibrate the EuPhO 2024 piezoelectricity experimental exam, with 280 lab kits assembled.',
    logo: {
      src: './media/EuPho-Logo-03-2048x780.png',
      alt: 'European Physics Olympiad',
      bg: 'dark',
    },
  },
  {
    id: 'gra-sumo',
    period: '2024',
    title: '3rd Place — National Sumo Robot Championship',
    organization: 'Georgian Robotics Association (Robo Battle)',
    organizationUrl:'https://gra.ge/',
    summary:
      'Earned national podium finish in the 500 g autonomous sumo robotics division in Tbilisi;',
    logo: {
      src: './media/gralogo-text.png',
      alt: 'Georgian Robotics Association',
      bg: 'none',
      borderless: true,
    },
  },
  {
    id: 'komarovi-stem',
    period: '2023 – 2025',
    title: 'Head of STEM Lab & Online STEM School Administrator',
    organization: 'Komarovi STEM Laboratory & Online STEM School',
    organizationUrl: 'https://komarovi.edu.ge',
    summary:
      'Managed laboratory operations ($7,000+ equipment funding secured), mentored the IYPT 2024 National Bronze team, and co-developed a 2-year ESP32/IoT curriculum serving 400+ students.',
    logo: {
      src: './media/stemschool.png',
      alt: 'Online STEM School',
      bg: 'none',
      borderless: true,
    },
  },
  
  {
    id: 'wro-medal',
    period: '2023',
    title: 'National Overall Winner & International Bronze Medal',
    organization: 'World Robot Olympiad (WRO)',
    organizationUrl:'https://wro-association.org/',
    summary:
      '1st Place at the Georgian National Championship (0:59 / 2:00 full-score run) and International Bronze Medalist.',
    logo: {
      src: './media/wro.webp',
      alt: 'World Robot Olympiad',
      bg: 'dark',
    },
  },
  {
    id: 'ipho-medals',
    period: '2023',
    title: 'Int’l Physics Olympiad | Silver Medalist',
    organization: 'International Physics Olympiad (IPhO)',
    organizationUrl:'https://ipho-unofficial.org/',
    summary:
      'Represented Georgia three consecutive years, earning Silver Medals in Tokyo (2023) and 2022, and a Bronze Medal in 2021.',
    logo: {
      src: './media/ipho.png',
      alt: 'International Physics Olympiad',
      bg: 'white',
    },
  },
  {
    id: 'iypt-competitor',
    period: '2023',
    title: 'Presenter at IYPT 2023',
    organization: 'International Young Physicists’ Tournament (IYPT)',
    organizationUrl:'https://iypt.org/',
    summary: 'Represented Georgia at IYPT 2023. Studied 8 open physics problems on IYPT problems list from 2019 to 2023.',
    logo: {
      src: './media/iypt.png',
      alt: 'International Young Physicists Tournament',
      bg: 'white',
    },
  },
];

export const HIGH_LEVEL_SKILLS: HighLevelSkill[] = [
  {
    id: 'embedded',
    name: 'ESP-IDF',
  },
  {
    id: 'isaac-sim',
    name: 'NVIDIA Isaac Sim',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
  },
  {
    id: 'fusion',
    name: 'Fusion 360',
  },
  {
    id: 'blender',
    name: 'Blender',
  },
  {
    id: 'ansys',
    name: 'Ansys',
  },
  {
    id: 'kicad',
    name: 'KiCad',
  },
  {
    id: 'matlab',
    name: 'MATLAB',
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi',
  },
  {
    id: 'mqtt',
    name: 'MQTT',
  },
];
