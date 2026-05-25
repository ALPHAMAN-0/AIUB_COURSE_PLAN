const rawCore = [
  { code: 'MAT1102', title: 'Differential Calculus & Co-ordinate Geometry', prereq: 'Nil', credit: '3' },
  { code: 'PHY1101', title: 'Physics 1', prereq: 'Nil', credit: '3' },
  { code: 'PHY1102', title: 'Physics 1 Lab', prereq: 'Nil', credit: '1' },
  { code: 'ENG1101', title: 'English Reading Skills & Public Speaking', prereq: 'Nil', credit: '3' },
  { code: 'CSC1101', title: 'Introduction to Computer Studies', prereq: 'Nil', credit: '1' },
  { code: 'CSC1103', title: 'Introduction to Programming Lab', prereq: 'Nil', credit: '1' },
  { code: 'CSC1102', title: 'Introduction to Programming', prereq: 'Nil', credit: '3' },
  { code: 'CSC1204', title: 'Discrete Mathematics', prereq: 'MAT1102 & CSC1102', credit: '3' },
  { code: 'MAT1205', title: 'Integral Calculus & Ordinary Differential Equations', prereq: 'MAT1102', credit: '3' },
  { code: 'CSC1205', title: 'Object Oriented Programming 1', prereq: 'CSC1102 & CSC1103', credit: '3/Lab' },
  { code: 'PHY1203', title: 'Physics 2', prereq: 'PHY1101', credit: '3' },
  { code: 'PHY1204', title: 'Physics 2 Lab', prereq: 'PHY1102', credit: '1' },
  { code: 'ENG1202', title: 'English Writing Skills & Communications', prereq: 'ENG1101', credit: '3' },
  { code: 'COE2101', title: 'Introduction to Electrical Circuits', prereq: 'PHY1101', credit: '3' },
  { code: 'COE2102', title: 'Introduction to Electrical Circuits Lab', prereq: 'PHY1102', credit: '1' },
  { code: 'CHEM1101', title: 'Chemistry', prereq: 'PHY1203', credit: '3' },
  { code: 'MAT2101', title: 'Complex Variable, Laplace & Z-Transformation', prereq: 'MAT1205', credit: '3' },
  { code: 'CSC2108', title: 'Introduction to Database', prereq: 'CSC1205', credit: '3/Lab' },
  { code: 'EEE2104', title: 'Electronic Devices Lab', prereq: 'COE2102', credit: '1' },
  { code: 'BBA1102', title: 'Principles of Accounting', prereq: 'MAT1205', credit: '3' },
  { code: 'EEE2103', title: 'Electronic Devices', prereq: 'COE2101', credit: '3' },
  { code: 'CSC2106', title: 'Data Structure', prereq: 'CSC1204 & CSC1205', credit: '3' },
  { code: 'CSC2107', title: 'Data Structure Lab', prereq: 'CSC1204 & CSC1205', credit: '1' },
  { code: 'BAE2101', title: 'Computer Aided Design & Drafting', prereq: 'Nil', credit: '1' },
  { code: 'CSC2211', title: 'Algorithms', prereq: 'CSC2106', credit: '3/Lab' },
  { code: 'MAT2202', title: 'Matrices, Vectors, Fourier Analysis', prereq: 'MAT2101', credit: '3' },
  { code: 'CSC2210', title: 'Object Oriented Programming 2', prereq: 'CSC2106 & CSC2108', credit: '3/Lab' },
  { code: 'CSC2209', title: 'Object Oriented Analysis and Design', prereq: 'CSC2108', credit: '3' },
  { code: 'BAS2101', title: 'Bangladesh Studies', prereq: 'CSC1101', credit: '3' },
  { code: 'EEE3101', title: 'Digital Logic and Circuits', prereq: 'EEE2103', credit: '3' },
  { code: 'EEE3102', title: 'Digital Logic and Circuits Lab', prereq: 'EEE2104', credit: '1' },
  { code: 'MAT3103', title: 'Computational Statistics and Probability', prereq: 'MAT2101', credit: '3' },
  { code: 'CSC3113', title: 'Theory of Computation', prereq: 'CSC2211', credit: '3' },
  { code: 'ECO3150', title: 'Principles of Economics', prereq: 'MAT3103', credit: '2' },
  { code: 'ENG2103', title: 'Business Communication', prereq: 'BAS2101', credit: '3' },
  { code: 'MAT3101', title: 'Numerical Methods for Science and Engineering', prereq: 'MAT2202', credit: '3' },
  { code: 'COE3103', title: 'Data Communication', prereq: 'EEE3101 & EEE3102', credit: '3/Lab' },
  { code: 'COE3104', title: 'Microprocessor and Embedded Systems', prereq: 'EEE3101 & EEE3102', credit: '3' },
  { code: 'CSC3112', title: 'Software Engineering', prereq: 'CSC2209', credit: '3/Lab' },
  { code: 'CSC3217', title: 'Artificial Intelligence and Expert System', prereq: 'CSC2211 & MAT3103', credit: '3/Lab' },
  { code: 'COE3206', title: 'Computer Networks', prereq: 'COE3103', credit: '3/Lab' },
  { code: 'COE3205', title: 'Computer Organization and Architecture', prereq: 'COE3104', credit: '3/Lab' },
  { code: 'CSC3214', title: 'Operating System', prereq: 'CSC2211 & COE3104', credit: '3/Lab' },
  { code: 'CSC3215', title: 'Web Technologies', prereq: 'CSC3112', credit: '3/Lab' },
  { code: 'EEE2216', title: 'Engineering Ethics', prereq: 'CSC3112 & COE3104', credit: '2' },
  { code: 'CSC3216', title: 'Compiler Design', prereq: 'CSC3113', credit: '3/Lab' },
  { code: 'CSC4118', title: 'Computer Graphics', prereq: 'CSC2211 & MAT2202', credit: '3/Lab' },
  { code: 'MGT3202', title: 'Engineering Management', prereq: 'EEE2216', credit: '3' },
  { code: 'CSC4197', title: 'Research Methodology', prereq: '100 Credits Completed', credit: '3' },
  { code: 'CSC4299', title: 'Thesis', prereq: 'CSC4197', credit: '3' },
  { code: 'CSC4296', title: 'Internship', prereq: '139 Credits Completed', credit: '3' }
]

const rawElectives = {
  informationSystems: [
    { code: 'CSC4181', title: 'Advanced Database Management System', prereq: 'CSC2108', credit: '3/Lab' },
    { code: 'MIS3101', title: 'Management Information System', prereq: 'CSC3112', credit: '3' },
    { code: 'MIS4011', title: 'Enterprise Resource Planning', prereq: 'MIS3101 & CSC3112', credit: '3' },
    { code: 'CSC4285', title: 'Data Warehouse and Data Mining', prereq: 'CSC2211 & MAT3103', credit: '3' },
    { code: 'CSC4182', title: 'Human Computer Interaction', prereq: 'CSC3217 & CSC3215', credit: '3' },
    { code: 'MIS4014', title: 'Business Intelligence and Decision Support Systems', prereq: 'Not mentioned', credit: '3' },
    { code: 'CSC4180', title: 'Introduction to Data Science', prereq: 'Not mentioned', credit: '3' },
    { code: 'CSC4183', title: 'Cyber Laws & Information Security', prereq: 'Not mentioned', credit: '3' },
    { code: 'MIS4007', title: 'Digital Marketing', prereq: 'Not mentioned', credit: '3' },
    { code: 'MIS4012', title: 'E-Commerce, E-Governance & E-Series', prereq: 'Not mentioned', credit: '3' }
  ],
  softwareEngineering: [
    { code: 'CSC4270', title: 'Software Development Project Management', prereq: 'CSC3112', credit: '3' },
    { code: 'CSC4160', title: 'Software Requirement Engineering', prereq: 'CSC3112', credit: '3' },
    { code: 'CSC4271', title: 'Software Quality and Testing', prereq: 'CSC3112', credit: '3' },
    { code: 'CSC4162', title: 'Programming in Python', prereq: 'CSC3215', credit: '3/Lab' },
    { code: 'CSC4274', title: 'Virtual Reality Systems Design', prereq: 'CSC2210', credit: '3' },
    { code: 'CSC4163', title: 'Advanced Programming with Java', prereq: 'CSC3215', credit: '3/Lab' },
    { code: 'CSC4164', title: 'Advanced Programming with .NET', prereq: 'CSC3215', credit: '3/Lab' },
    { code: 'CSC4161', title: 'Advanced Programming in Web Technology', prereq: 'CSC3215', credit: '3/Lab' },
    { code: 'CSC4272', title: 'Mobile Application Development', prereq: 'CSC3215', credit: '3/Lab' },
    { code: 'CSC4273', title: 'Software Architecture and Design Patterns', prereq: 'CSC3112', credit: '3' }
  ],
  computationalTheory: [
    { code: 'CSC4125', title: 'Computer Science Mathematics', prereq: 'CSC2211 & MAT3101', credit: '3' },
    { code: 'CSC4126', title: 'Basic Graph Theory', prereq: 'CSC2211', credit: '3' },
    { code: 'CSC4127', title: 'Advanced Algorithm Techniques', prereq: 'CSC3217', credit: '3/Lab' },
    { code: 'CSC4233', title: 'Natural Language Processing', prereq: 'CSC3217 & CSC4162', credit: '3' },
    { code: 'CSC4128', title: 'Linear Programming', prereq: 'CSC3217 & MAT3103', credit: '3/Lab' },
    { code: 'CSC4231', title: 'Parallel Computing', prereq: 'CSC3217', credit: '3' },
    { code: 'CSC4232', title: 'Machine Learning', prereq: 'CSC3217', credit: '3' }
  ],
  computerEngineering: [
    { code: 'BAE1201', title: 'Basic Mechanical Engineering', prereq: 'PHY1203', credit: '3' },
    { code: 'EEE3103', title: 'Digital Signal Processing', prereq: 'EEE2213', credit: '3' },
    { code: 'EEE4217', title: 'VLSI Circuit Design', prereq: 'EEE3101 & EEE3102', credit: '3' },
    { code: 'EEE2213', title: 'Signals & Linear System', prereq: 'MAT2202', credit: '3' },
    { code: 'COE4128', title: 'Digital System Design', prereq: 'COE3205', credit: '3' },
    { code: 'COE4231', title: 'Image Processing', prereq: 'CSC4118 & EEE2213', credit: '3' },
    { code: 'COE4129', title: 'Multimedia Systems', prereq: 'CSC3215', credit: '3' },
    { code: 'COE4230', title: 'Simulation & Modeling', prereq: 'CSC3217', credit: '3/Lab' },
    { code: 'COE4126', title: 'Advanced Computer Networks', prereq: 'COE3206', credit: '3/Lab' },
    { code: 'COE4234', title: 'Computer Vision and Pattern Recognition', prereq: 'CSC4118', credit: '3' },
    { code: 'COE4232', title: 'Network Security', prereq: 'COE3103', credit: '3' },
    { code: 'COE4125', title: 'Advanced Operating System', prereq: 'CSC3214', credit: '3/Lab' },
    { code: 'EEE4233', title: 'Digital Design with System: Verilog, VHDL & FPGAs', prereq: 'EEE4217', credit: '3' },
    { code: 'COE4235', title: 'Robotics Engineering', prereq: 'CSC3217', credit: '3' },
    { code: 'EEE4209', title: 'Telecommunications Engineering', prereq: 'COE3103', credit: '3' },
    { code: 'COE4127', title: 'Network Resource Management & Organization', prereq: 'COE3103', credit: '3' },
    { code: 'COE4233', title: 'Wireless Sensor Networks', prereq: 'COE3103', credit: '3/Lab' },
    { code: 'EEE4241', title: 'Industrial Electronics, Drives & Instrumentation', prereq: 'EEE3101', credit: '3/Lab' }
  ]
}

const majorLabels = {
  informationSystems: 'Information Systems',
  softwareEngineering: 'Software Engineering',
  computationalTheory: 'Computational Theory',
  computerEngineering: 'Computer Engineering'
}

const majorDescriptions = {
  informationSystems: 'Databases, ERP, business intelligence, e-commerce.',
  softwareEngineering: 'Software design, testing, web, mobile, app development.',
  computationalTheory: 'Algorithms, ML, NLP, parallel computing, graph theory.',
  computerEngineering: 'Hardware, networks, embedded, VLSI, robotics, security.'
}

const careers = [
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

export const cse = {
  id: 'cse',
  name: 'BSc in Computer Science & Engineering',
  shortName: 'CSE',
  logo: 'CSE',
  totalCredits: 148,
  semesterCount: 8,
  rawCore,
  electives: rawElectives,
  majorLabels,
  majorDescriptions,
  careers
}
