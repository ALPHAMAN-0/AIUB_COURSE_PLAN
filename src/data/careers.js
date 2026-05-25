export const careers = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    icon: '💻',
    blurb: 'Build full-stack applications, APIs, and scalable systems.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4270', 'CSC4160', 'CSC4271', 'CSC4273'],
    cosElectives: ['CSC4163', 'CSC4162']
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    icon: '🌐',
    blurb: 'Design and ship modern web apps and services.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4161', 'CSC4163', 'CSC4164'],
    cosElectives: ['CSC4272', 'CSC4162']
  },
  {
    id: 'mobile-developer',
    title: 'Mobile App Developer',
    icon: '📱',
    blurb: 'Build iOS and Android apps with native and cross-platform tools.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4272', 'CSC4163', 'CSC4274'],
    cosElectives: ['CSC4162', 'CSC4161']
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    icon: '🤖',
    blurb: 'Train ML models, build AI pipelines and intelligent systems.',
    majorTrack: 'computationalTheory',
    recommended: ['CSC4232', 'CSC4233', 'CSC4127'],
    cosElectives: ['CSC4180', 'CSC4162']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: '📊',
    blurb: 'Analyze data, run experiments, and surface insights.',
    majorTrack: 'informationSystems',
    recommended: ['CSC4180', 'CSC4285', 'MIS4014'],
    cosElectives: ['CSC4232', 'CSC4162']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Engineer',
    icon: '🛡️',
    blurb: 'Defend networks, systems, and data from threats.',
    majorTrack: 'computerEngineering',
    recommended: ['COE4232', 'COE4126', 'COE4233'],
    cosElectives: ['CSC4183', 'CSC4181']
  },
  {
    id: 'computer-engineer',
    title: 'Computer / Hardware Engineer',
    icon: '🔧',
    blurb: 'Design hardware, embedded systems, and chip architectures.',
    majorTrack: 'computerEngineering',
    recommended: ['EEE4217', 'COE4128', 'EEE4233'],
    cosElectives: ['COE4125', 'COE4129']
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    icon: '📡',
    blurb: 'Build and operate large-scale network infrastructure.',
    majorTrack: 'computerEngineering',
    recommended: ['COE4126', 'COE4127', 'COE4232'],
    cosElectives: ['COE4233', 'EEE4209']
  },
  {
    id: 'game-developer',
    title: 'Game / Graphics Developer',
    icon: '🎮',
    blurb: 'Make games, VR experiences, and real-time graphics.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4274', 'CSC4163', 'CSC4272'],
    cosElectives: ['COE4231', 'COE4234']
  },
  {
    id: 'researcher',
    title: 'Researcher / Academia',
    icon: '🔬',
    blurb: 'Pursue graduate study and original CS research.',
    majorTrack: 'computationalTheory',
    recommended: ['CSC4125', 'CSC4126', 'CSC4127'],
    cosElectives: ['CSC4232', 'CSC4231']
  },
  {
    id: 'is-manager',
    title: 'IT / IS Manager',
    icon: '📋',
    blurb: 'Run enterprise systems, ERP, and IT operations.',
    majorTrack: 'informationSystems',
    recommended: ['MIS3101', 'MIS4011', 'MIS4014'],
    cosElectives: ['MIS4007', 'MIS4012']
  },
  {
    id: 'devops-engineer',
    title: 'DevOps / SRE Engineer',
    icon: '⚙️',
    blurb: 'Automate deployments, build CI/CD pipelines, and run reliable production systems.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4270', 'CSC4271', 'CSC4273'],
    cosElectives: ['COE4125', 'COE4126']
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    icon: '☁️',
    blurb: 'Design and operate scalable cloud infrastructure on AWS, Azure, and GCP.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4273', 'CSC4270', 'CSC4162'],
    cosElectives: ['COE4126', 'COE4232']
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    icon: '⛓️',
    blurb: 'Build smart contracts, dApps, and decentralized systems on Ethereum and beyond.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4273', 'CSC4163', 'CSC4162'],
    cosElectives: ['CSC4183', 'COE4232']
  },
  {
    id: 'xr-developer',
    title: 'AR / VR / XR Developer',
    icon: '🥽',
    blurb: 'Build immersive AR, VR, and mixed reality experiences for headsets and mobile.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4274', 'CSC4272', 'CSC4163'],
    cosElectives: ['COE4231', 'COE4234']
  },
  {
    id: 'qa-sdet',
    title: 'QA / SDET Engineer',
    icon: '✅',
    blurb: 'Write automated tests, CI pipelines, and ship high-quality software at scale.',
    majorTrack: 'softwareEngineering',
    recommended: ['CSC4271', 'CSC4270', 'CSC4162'],
    cosElectives: ['CSC4163', 'CSC4181']
  },
  {
    id: 'iot-engineer',
    title: 'Embedded / IoT Engineer',
    icon: '🔌',
    blurb: 'Build firmware and IoT systems connecting sensors, devices, and the cloud.',
    majorTrack: 'computerEngineering',
    recommended: ['COE4128', 'EEE4233', 'COE4233'],
    cosElectives: ['COE4235', 'EEE4217']
  }
]

export const careerById = Object.fromEntries(careers.map(c => [c.id, c]))
