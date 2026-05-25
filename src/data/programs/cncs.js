const semesters = [
  {
    semester: 1,
    courses: [
      { code: 'CSC1101', course: 'INTRODUCTION TO COMPUTER STUDIES', prerequisite: null, credit: 1 },
      { code: 'CSC1102', course: 'INTRODUCTION TO PROGRAMMING', prerequisite: null, credit: 3 },
      { code: 'CSC1103', course: 'INTRODUCTION TO PROGRAMMING LAB', prerequisite: null, credit: 1 },
      { code: 'MAT1102', course: 'DIFF CALCULUS AND COORDINATE GEOMETRY', prerequisite: null, credit: 3 },
      { code: 'PHY1101', course: 'PHYSICS 1', prerequisite: null, credit: 3 },
      { code: 'PHY1102', course: 'PHYSICS 1 LAB', prerequisite: null, credit: 1 },
      { code: 'ENG1101', course: 'ENGLISH READING SKILLS & PUBLIC SPEAKING', prerequisite: null, credit: 3 },
      { code: 'BAS2101', course: 'BANGLADESH STUDIES', prerequisite: null, credit: 3 }
    ]
  },
  {
    semester: 2,
    courses: [
      { code: 'BSE1201', course: 'OBJECT ORIENTED PROGRAMMING 1 (JAVA)', prerequisite: ['CSC1102', 'CSC1103'], credit: 3 },
      { code: 'CSC1204', course: 'DISCRETE MATHEMATICS', prerequisite: null, credit: 3 },
      { code: 'CSC1205', course: 'DATA STRUCTURE', prerequisite: ['CSC1102', 'CSC1103'], credit: 3 },
      { code: 'CSC1206', course: 'DATA STRUCTURE LAB', prerequisite: ['CSC1102', 'CSC1103'], credit: 1 },
      { code: 'MAT1205', course: 'INTEGRAL CALCULUS & ORD. DIFF EQUATION', prerequisite: ['MAT1102'], credit: 3 },
      { code: 'COE2166', course: 'DIGITAL LOGIC & ELECTRONICS', prerequisite: ['PHY1101', 'PHY1102'], credit: 3 },
      { code: 'ENG1202', course: 'ENGLISH WRITING SKILLS & COMMUNICATIONS [CS/ENGG]', prerequisite: ['ENG1101'], credit: 3 }
    ]
  },
  {
    semester: 3,
    courses: [
      { code: 'BDS2101', course: 'INTRODUCTION TO DATABASE', prerequisite: ['CSC1205', 'CSC1206'], credit: 3 },
      { code: 'PHY1203', course: 'PHYSICS 2', prerequisite: ['PHY1101'], credit: 3 },
      { code: 'PHY2104', course: 'PHYSICS 2 LAB', prerequisite: ['PHY1102'], credit: 1 },
      { code: 'CNE2101', course: 'DATA COMMUNICATION', prerequisite: null, credit: 3 },
      { code: 'BBA1102', course: 'PRINCIPLES OF ACCOUNTING', prerequisite: null, credit: 3 },
      { code: 'MAT2202', course: 'MATRICES, VECTORS, FOURIER ANALYSIS', prerequisite: ['MAT1205'], credit: 3 },
      { code: 'CSC2107', course: 'ALGORITHMS', prerequisite: ['CSC1205', 'CSC1206'], credit: 3 },
      { code: 'ECO3150', course: 'PRINCIPLES OF ECONOMICS', prerequisite: null, credit: 2 }
    ]
  },
  {
    semester: 4,
    courses: [
      { code: 'CNE2203', course: 'COMPUTER NETWORKS', prerequisite: ['CNE2101', 'CSC2107'], credit: 3 },
      { code: 'CNE2204', course: 'WEB TECHNOLOGIES', prerequisite: ['BSE1201'], credit: 3 },
      { code: 'CYS2202', course: 'NETWORK SECURITY INFRASTRUCTURE AND CYBERSECURITY', prerequisite: ['CNE2101'], credit: 3 },
      { code: 'CNE2202', course: 'OPERATING SYSTEMS', prerequisite: ['CSC2107'], credit: 3 },
      { code: 'MAT3101', course: 'NUMERICAL METHODS FOR SCIENCE AND ENGINEERING', prerequisite: ['MAT2202'], credit: 3 },
      { code: 'MAT3103', course: 'COMPUTATIONAL STATISTICS AND PROBABILITY', prerequisite: ['MAT2202'], credit: 3 }
    ]
  },
  {
    semester: 5,
    courses: [
      { code: 'ENG2103', course: 'BUSINESS COMMUNICATION [CS/ENGG]', prerequisite: ['BAS2101'], credit: 3 },
      { code: 'COE3205', course: 'COMPUTER ORGANIZATION AND ARCHITECTURE', prerequisite: ['CNE2202'], credit: 3 },
      { code: 'CSC3210', course: 'ARTIFICIAL INTELLIGENCE AND EXPERT SYSTEM', prerequisite: ['CSC2107', 'MAT3103'], credit: 3 },
      { code: 'CYS3207', course: 'MOBILE DEVICES AND WIRELESS SECURITY', prerequisite: ['CNE3107'], credit: 3 },
      { code: 'CYS3103', course: 'CYBER LAWS', prerequisite: ['CYS2202'], credit: 3 },
      { code: 'CNE3107', course: 'ADVANCED COMPUTER NETWORKS', prerequisite: ['CNE2203'], credit: 3 },
      { code: 'BSE4112', course: 'PROGRAMMING IN PYTHON', prerequisite: ['BSE1201'], credit: 3 }
    ]
  },
  {
    semester: 6,
    courses: [
      { code: 'CNE3211', course: 'ETHICAL HACKING AND NETWORK DEFENSE', prerequisite: ['CYS3103'], credit: 3 },
      { code: 'CNE3212', course: 'DISASTER RECOVERY', prerequisite: ['CNE3107'], credit: 3 },
      { code: 'CYS3205', course: 'DIGITAL FORENSIC INVESTIGATION', prerequisite: ['CYS3103'], credit: 3 },
      { code: 'COE3104', course: 'MICROPROCESSOR AND EMBEDDED SYSTEMS', prerequisite: ['COE3205'], credit: 3 },
      { code: '0', course: 'NE MAJOR 1', prerequisite: null, credit: 3 },
      { code: '0', course: 'NE MAJOR 2', prerequisite: null, credit: 3 }
    ]
  },
  {
    semester: 7,
    courses: [
      { code: 'CSC4197', course: 'RESEARCH METHODOLOGY', prerequisite: '100 Credits', credit: 3 },
      { code: 'CNE4117', course: 'INFORMATION SYSTEM AUDITING', prerequisite: ['CNE3212'], credit: 3 },
      { code: 'CNE4116', course: 'INFORMATION SYSTEM SECURITY PLANNING, DESIGN AND INCIDENT RESPONSE', prerequisite: ['CNE3212'], credit: 3 },
      { code: 'CNE4118', course: 'PROJECT MANAGEMENT IN IT SECURITY', prerequisite: ['CNE3212'], credit: 3 },
      { code: '0', course: 'NE MAJOR 3', prerequisite: null, credit: 3 },
      { code: '0', course: 'NE MAJOR 4', prerequisite: null, credit: 3 },
      { code: '0', course: 'NE MAJOR 5', prerequisite: null, credit: 3 }
    ]
  },
  {
    semester: 8,
    courses: [
      { code: 'CSC4299', course: 'INTERNSHIP', prerequisite: '140 Credits', credit: 3 },
      { code: 'CSC4298', course: 'PROJECT & THESIS', prerequisite: ['CSC4197'], credit: 3 },
      { code: '0', course: 'NE ELECTIVE 1', prerequisite: null, credit: 3 },
      { code: '0', course: 'NE ELECTIVE 2', prerequisite: null, credit: 3 }
    ]
  }
]

const electives = {
  generalElectiveCyberSecurity: [
    { code: 'CYS3204', course: 'INTERNET OF THINGS (IOT) SECURITY', prerequisite: null, credit: 3 },
    { code: 'CYS3206', course: 'CLOUD SECURITY', prerequisite: null, credit: 3 },
    { code: 'CYS3208', course: 'CYBER SECURITY SOCIAL ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'CYS3214', course: 'CYBER CRIME INVESTIGATION', prerequisite: null, credit: 3 },
    { code: 'CYS3215', course: 'EMERGING TECHNOLOGIES IN COMPUTER NETWORKS AND SECURITY', prerequisite: null, credit: 3 },
    { code: 'CYS4220', course: 'ADVANCE TOPICS IN CYBER SECURITY', prerequisite: null, credit: 3 }
  ],
  majorInComputing: [
    { code: 'CSC3208', course: 'THEORY OF COMPUTATION', prerequisite: null, credit: 3 },
    { code: 'CSC3209', course: 'COMPUTER GRAPHICS', prerequisite: null, credit: 3 },
    { code: 'CSC4111', course: 'COMPILER DESIGN', prerequisite: null, credit: 3 },
    { code: 'CSC4115', course: 'COMPUTER SCIENCE MATHEMATICS', prerequisite: null, credit: 3 },
    { code: 'CSC4112', course: 'BASIC GRAPH THEORY', prerequisite: null, credit: 3 },
    { code: 'CSC4113', course: 'ADVANCED ALGORITHM TECHNIQUES', prerequisite: null, credit: 3 },
    { code: 'CSC4114', course: 'LINEAR PROGRAMMING', prerequisite: null, credit: 3 },
    { code: 'CSC4216', course: 'PARALLEL COMPUTING', prerequisite: null, credit: 3 },
    { code: 'CSC4218', course: 'HUMAN COMPUTER INTERACTION', prerequisite: null, credit: 3 },
    { code: 'COE4231', course: 'IMAGE PROCESSING', prerequisite: null, credit: 3 },
    { code: 'COE4234', course: 'COMPUTER VISION AND PATTERN RECOGNITION', prerequisite: null, credit: 3 },
    { code: 'CSC4220', course: 'ADVANCED TOPICS IN COMPUTING [CS]', prerequisite: null, credit: 3 }
  ],
  majorInSoftwareEngineering: [
    { code: 'BSE3104', course: 'SOFTWARE REQUIREMENT ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'BSE3105', course: 'SOFTWARE ARCHITECTURE AND DESIGN PATTERNS', prerequisite: null, credit: 3 },
    { code: 'BSE3207', course: 'MOBILE APPLICATION DEVELOPMENT', prerequisite: null, credit: 3 },
    { code: 'BSE3208', course: 'SOFTWARE QUALITY AND TESTING', prerequisite: null, credit: 3 },
    { code: 'BSE4109', course: 'SOFTWARE DEVELOPMENT PROJECT MANAGEMENT', prerequisite: null, credit: 3 },
    { code: 'BSE4110', course: 'SOFTWARE PROJECT', prerequisite: null, credit: 3 },
    { code: 'BSE4111', course: 'ADVANCED PROGRAMMING IN WEB TECHNOLOGY', prerequisite: null, credit: 3 },
    { code: 'BSE4113', course: 'ADVANCED PROGRAMMING WITH JAVA', prerequisite: null, credit: 3 },
    { code: 'BSE4114', course: 'ADVANCED PROGRAMMING WITH .NET', prerequisite: null, credit: 3 },
    { code: 'BSE4215', course: 'VIRTUAL REALITY SYSTEMS DESIGN', prerequisite: null, credit: 3 },
    { code: 'BSE4216', course: 'METAVERSE TECHNOLOGY', prerequisite: null, credit: 3 },
    { code: 'BSE4220', course: 'ADVANCED TOPICS IN SOFTWARE ENGINEERING', prerequisite: null, credit: 3 }
  ],
  majorInDataScience: [
    { code: 'BDS2102', course: 'INTRODUCTION TO DATA SCIENCE', prerequisite: null, credit: 3 },
    { code: 'BDS2203', course: 'DATA PROCESSING', prerequisite: null, credit: 3 },
    { code: 'BDS3104', course: 'DATA PRIVACY, SECURITY AND PROTECTION', prerequisite: null, credit: 3 },
    { code: 'BDS3105', course: 'STATISTICAL AND DATA ANALYSIS', prerequisite: null, credit: 3 },
    { code: 'BDS3106', course: 'PROGRAMMING FOR DATA SCIENCE', prerequisite: null, credit: 3 },
    { code: 'BDS3207', course: 'ETHICS IN DATA SCIENCE & ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'BDS3208', course: 'DATA VISUALIZATION', prerequisite: null, credit: 3 },
    { code: 'BDS4109', course: 'BIG DATA ARCHITECTURE', prerequisite: null, credit: 3 },
    { code: 'BDS4110', course: 'DATA WAREHOUSING AND DATA MINING [CS]', prerequisite: null, credit: 3 },
    { code: 'BDS4112', course: 'MACHINE LEARNING & EXPERT SYSTEMS', prerequisite: null, credit: 3 },
    { code: 'BDS4113', course: 'ADVANCE DATABASE MANAGEMENT SYSTEM', prerequisite: null, credit: 3 },
    { code: 'BDS4214', course: 'NATURAL LANGUAGE PROCESSING', prerequisite: null, credit: 3 },
    { code: 'BDS4315', course: 'DEEP LEARNING', prerequisite: null, credit: 3 },
    { code: 'BDS4316', course: 'SOCIAL COMPUTING AND DATA ANALYTICS FOR BUSINESS', prerequisite: null, credit: 3 },
    { code: 'BDS4317', course: 'EMERGING TECHNOLOGIES IN DATA SCIENCE', prerequisite: null, credit: 3 }
  ],
  majorInComputerArchitecture: [
    { code: 'COE4128', course: 'DIGITAL SYSTEM DESIGN', prerequisite: null, credit: 3 },
    { code: 'EEE4241', course: 'INDUSTRIAL ELECTRONICS, DRIVES & INSTRUMENTATION', prerequisite: null, credit: 3 },
    { code: 'COE4129', course: 'MULTIMEDIA SYSTEMS', prerequisite: null, credit: 3 },
    { code: 'COE4235', course: 'ROBOTICS ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'EEE4217', course: 'VLSI CIRCUIT DESIGN', prerequisite: null, credit: 3 },
    { code: 'EEE4233', course: 'DIGITAL DESIGN WITH SYSTEM [VERILOG, VHDL & FPGAS]', prerequisite: null, credit: 3 },
    { code: 'COE4220', course: 'ADVANCE TOPICS IN COMPUTER ARCHITECTURE', prerequisite: null, credit: 3 }
  ],
  majorInNetworkEngineering: [
    { code: 'CNE3106', course: 'SECURE NETWORK SYSTEMS DESIGN AND MANAGEMENT', prerequisite: null, credit: 3 },
    { code: 'CNE4219', course: 'NETWORK SECURITY', prerequisite: null, credit: 3 },
    { code: 'CNE4220-NE', course: 'NETWORK RESOURCE MANAGEMENT & ORGANIZATION', prerequisite: null, credit: 3 },
    { code: 'CNE4221', course: 'CRYPTOGRAPHY', prerequisite: null, credit: 3 },
    { code: 'CNE4222', course: 'SIMULATION & MODELING', prerequisite: null, credit: 3 },
    { code: 'CNE4223', course: 'ADVANCED OPERATING SYSTEM', prerequisite: null, credit: 3 },
    { code: 'CNE4224', course: 'WIRELESS SENSOR NETWORKS', prerequisite: null, credit: 3 },
    { code: 'EEE2213', course: 'SIGNAL & LINEAR SYSTEM', prerequisite: null, credit: 3 },
    { code: 'EEE3103', course: 'DIGITAL SIGNAL PROCESSING', prerequisite: null, credit: 3 },
    { code: 'EEE4209', course: 'TELECOMMUNICATIONS ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'CNE4220-ADV', course: 'ADVANCE TOPICS IN NETWORK ENGINEERING', prerequisite: null, credit: 3 }
  ],
  majorInRobotics: [
    { code: 'RBT4101', course: 'INTRODUCTION TO ROBOTICS SYSTEMS', prerequisite: null, credit: 3 },
    { code: 'RBT4102', course: 'INTEGRATED ROBOTICS SYSTEMS ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'RBT4103', course: 'MECHATRONICS', prerequisite: null, credit: 3 },
    { code: 'RBT4104', course: 'SIGNAL PROCESSING', prerequisite: null, credit: 3 },
    { code: 'RBT4105', course: 'BASIC MECHANICAL ENGINEERING', prerequisite: null, credit: 3 },
    { code: 'RBT4106', course: 'ENGINEERING DESIGN AND PROTOTYPING', prerequisite: null, credit: 3 },
    { code: 'RBT4107', course: 'APPLIED ROBOTICS', prerequisite: null, credit: 3 },
    { code: 'RBT4108', course: 'KINEMATICS AND DYNAMICS', prerequisite: null, credit: 3 },
    { code: 'RBT4109', course: 'MICROELECTRONIC CIRCUITS', prerequisite: null, credit: 3 },
    { code: 'RBT4110', course: 'EMBEDDED SYSTEMS', prerequisite: null, credit: 3 },
    { code: 'RBT4220', course: 'ADVANCED TOPICS IN ROBOTICS', prerequisite: null, credit: 3 }
  ],
  majorInBusinessIntelligence: [
    { code: 'CBI4101', course: 'FINANCIAL DATA MANAGEMENT', prerequisite: null, credit: 3 },
    { code: 'CBI4102', course: 'KNOWLEDGE MANAGEMENT SYSTEMS', prerequisite: null, credit: 3 },
    { code: 'BDS4109-BI', course: 'BIG DATA ARCHITECTURE', prerequisite: null, credit: 3 },
    { code: 'CBI4104', course: 'DECISION SUPPORT SYSTEM', prerequisite: null, credit: 3 },
    { code: 'CBI4105', course: 'DIGITAL MARKETING', prerequisite: null, credit: 3 },
    { code: 'CBI4106', course: 'BUSINESS SOFTWARE TECHNOLOGIES', prerequisite: null, credit: 3 },
    { code: 'CBI4107', course: 'BLOCKCHAIN TECHNOLOGIES IN BUSINESS', prerequisite: null, credit: 3 },
    { code: 'CBI4109', course: 'ACCOUNTING INFORMATION SYSTEMS', prerequisite: null, credit: 3 },
    { code: 'CBI4110', course: 'SUPPLY CHAIN MANAGEMENT SYSTEM', prerequisite: null, credit: 3 },
    { code: 'CBI4220', course: 'ADVANCED TOPICS IN BUSINESS INTELLIGENCE', prerequisite: null, credit: 3 }
  ],
  majorInBioinformatics: [
    { code: 'BIO4101', course: 'INTRODUCTION TO BIOINFORMATICS', prerequisite: null, credit: 3 },
    { code: 'BIO4102', course: 'COMPUTATIONAL BIOLOGY', prerequisite: null, credit: 3 },
    { code: 'BIO4103', course: 'EVOLUTIONARY BIOLOGY', prerequisite: null, credit: 3 },
    { code: 'BIO4104', course: 'CELL BIOLOGY', prerequisite: null, credit: 3 },
    { code: 'BIO4105', course: 'FUNDAMENTALS OF BIOLOGICAL CHEMISTRY', prerequisite: null, credit: 3 },
    { code: 'BIO4106', course: 'MOLECULAR BIOLOGY', prerequisite: null, credit: 3 },
    { code: 'BIO4107', course: 'BIOSTATISTICS', prerequisite: null, credit: 3 },
    { code: 'BIO4108', course: 'ORGANIC CHEMISTRY', prerequisite: null, credit: 3 },
    { code: 'BIO4109', course: 'COMPUTERIZED GENETIC SEQUENCE ANALYSIS', prerequisite: null, credit: 3 },
    { code: 'BIO4110', course: 'BIOINFORMATICS ALGORITHMS', prerequisite: null, credit: 3 },
    { code: 'BIO4120', course: 'ADVANCED TOPICS IN BIOINFORMATICS', prerequisite: null, credit: 3 }
  ],
  majorInInformationTechnologyManagement: [
    { code: 'ITM4101', course: 'IT STRATEGY AND GOVERNANCE', prerequisite: null, credit: 3 },
    { code: 'ITM4102', course: 'IT PROJECT MANAGEMENT', prerequisite: null, credit: 3 },
    { code: 'ITM4103', course: 'INFORMATION SECURITY', prerequisite: null, credit: 3 },
    { code: 'ITM4108', course: 'ENTERPRISE RESOURCE PLANNING [CS]', prerequisite: null, credit: 3 },
    { code: 'ITM4109', course: 'E-COMMERCE, E-GOVERNANCE & E-SERIES', prerequisite: null, credit: 3 },
    { code: 'ITM4110', course: 'EMERGING TECHNOLOGY AND ISSUES', prerequisite: null, credit: 3 },
    { code: 'ITM4220', course: 'ADVANCED TOPICS IN INFORMATION TECHNOLOGY MANAGEMENT', prerequisite: null, credit: 3 }
  ]
}

const majorLabels = {
  generalElectiveCyberSecurity: 'General Elective: Cybersecurity',
  majorInComputing: 'Major in Computing',
  majorInSoftwareEngineering: 'Major in Software Engineering',
  majorInDataScience: 'Major in Data Science',
  majorInComputerArchitecture: 'Major in Computer Architecture',
  majorInNetworkEngineering: 'Major in Network Engineering',
  majorInRobotics: 'Major in Robotics',
  majorInBusinessIntelligence: 'Major in Business Intelligence',
  majorInBioinformatics: 'Major in Bioinformatics',
  majorInInformationTechnologyManagement: 'Major in IT Management'
}

const majorDescriptions = {
  generalElectiveCyberSecurity: 'IoT/cloud security, forensics, social engineering, emerging cyber.',
  majorInComputing: 'Theory of computation, graph theory, parallel computing, HCI.',
  majorInSoftwareEngineering: 'Software architecture, testing, mobile, web, .NET, Java.',
  majorInDataScience: 'Data processing, big data, machine learning, NLP, visualization.',
  majorInComputerArchitecture: 'VLSI, FPGAs, robotics, embedded, multimedia systems.',
  majorInNetworkEngineering: 'Cryptography, network security, wireless, telecom, signals.',
  majorInRobotics: 'Mechatronics, kinematics, embedded systems, applied robotics.',
  majorInBusinessIntelligence: 'Decision support, financial data, ERP, supply chain.',
  majorInBioinformatics: 'Computational biology, biostatistics, genetics, molecular bio.',
  majorInInformationTechnologyManagement: 'IT strategy, project management, e-commerce, ERP.'
}

const slotGroupMap = {
  'NE MAJOR 1': null,
  'NE MAJOR 2': null,
  'NE MAJOR 3': null,
  'NE MAJOR 4': null,
  'NE MAJOR 5': null,
  'NE ELECTIVE 1': 'generalElectiveCyberSecurity',
  'NE ELECTIVE 2': 'generalElectiveCyberSecurity'
}

const careers = [
  {
    id: 'cncs-network-engineer',
    title: 'Network Engineer',
    icon: '📡',
    blurb: 'Design and run resilient large-scale network infrastructure.',
    majorTrack: 'majorInNetworkEngineering',
    recommended: ['CNE3106', 'CNE4219', 'CNE4224'],
    cosElectives: ['EEE4209', 'CNE4221']
  },
  {
    id: 'cncs-security-engineer',
    title: 'Cybersecurity Engineer',
    icon: '🛡️',
    blurb: 'Defend networks, systems, and data from cyber threats.',
    majorTrack: 'generalElectiveCyberSecurity',
    recommended: ['CYS3206', 'CYS3204', 'CYS3208'],
    cosElectives: ['CNE4221', 'CYS4220']
  },
  {
    id: 'cncs-soc-analyst',
    title: 'SOC / SecOps Analyst',
    icon: '🚨',
    blurb: 'Detect, triage, and respond to security incidents in production.',
    majorTrack: 'generalElectiveCyberSecurity',
    recommended: ['CYS3215', 'CYS3214', 'CYS3208'],
    cosElectives: ['CNE4222', 'CYS4220']
  },
  {
    id: 'cncs-forensics',
    title: 'Digital Forensics Investigator',
    icon: '🔍',
    blurb: 'Investigate cyber crimes; recover and analyze digital evidence.',
    majorTrack: 'generalElectiveCyberSecurity',
    recommended: ['CYS3214', 'CYS3215', 'CYS3208'],
    cosElectives: ['CYS4220', 'CNE4222']
  },
  {
    id: 'cncs-it-auditor',
    title: 'IT Security Auditor',
    icon: '📋',
    blurb: 'Audit information systems for compliance, risk, and controls.',
    majorTrack: 'majorInInformationTechnologyManagement',
    recommended: ['ITM4103', 'ITM4101', 'ITM4102'],
    cosElectives: ['CYS3206', 'CYS4220']
  },
  {
    id: 'cncs-crypto-iot',
    title: 'Cryptography / IoT Security',
    icon: '🔐',
    blurb: 'Build cryptographic systems and secure connected devices.',
    majorTrack: 'majorInNetworkEngineering',
    recommended: ['CNE4221', 'CNE4224', 'CNE4222'],
    cosElectives: ['CYS3204', 'CYS3207']
  }
]

export const cncs = {
  id: 'cncs',
  name: 'BSc in Computer Network & Cyber Security',
  shortName: 'CNCS',
  logo: 'CNCS',
  totalCredits: 148,
  semesterCount: 8,
  semesters,
  electives,
  slotGroupMap,
  majorLabels,
  majorDescriptions,
  careers
}
