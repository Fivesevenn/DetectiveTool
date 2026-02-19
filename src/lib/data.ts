// Hardcoded detective database for table-top game

export interface Detective {
  badgeNumber: string;
  password: string;
  name: string;
  rank: string;
}

export interface Case {
  id: string;
  caseName: string;
  accessCode: string;
  status: 'Open' | 'Closed';
  description: string;
  dateOpened: string;
}

export interface Character {
  id: string;
  caseId: string;
  fullName: string;
  alias?: string;
  lastKnownAddress: string;
  phoneNumber: string;
  fingerprintUrl?: string;
  photoUrl?: string;
  carId?: string;
  notes?: string;
}

export interface Car {
  id: string;
  caseId: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string;
  year: number;
  vinNumber: string;
  ownerId?: string;
}

export interface Evidence {
  id: string;
  caseId: string;
  subjectName: string;
  evidenceType: 'Witness Statement' | 'CCTV' | 'Audio Recording' | 'Document' | 'Photo';
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  photoUrl?: string;
  timestamp: string;
}

// Authorized detectives
export const detectives: Detective[] = [
  {
    badgeNumber: '3295',
    password: 'JLTFG',
    name: 'Detective Martinez',
    rank: 'Senior Detective'
  }
];

// Case files
export const cases: Case[] = [
  {
    id: '2025-147',
    caseName: 'Case 2025-147',
    accessCode: '1',
    status: 'Open',
    description: 'Missing persons investigation - High priority. Multiple witnesses reported unusual activity near the harbor district.',
    dateOpened: '2024-01-16'
  },
  {
    id: '2025-145',
    caseName: 'Case 2025-145',
    accessCode: 'DELTA3',
    status: 'Closed',
    description: 'Corporate espionage - Resolved. Suspect apprehended and evidence secured.',
    dateOpened: '2023-11-02'
  },
  {
    id: '2025-146',
    caseName: 'Case 2025-146',
    accessCode: 'SIGMA9',
    status: 'Open',
    description: 'Investigation of a missing 50 000 USD from Hartfield Realty',
    dateOpened: '2024-02-01'
  }
];

// Characters/Suspects
export const characters: Character[] = [
  {
    id: 'CHAR-001',
    caseId: '2025-147',
    fullName: 'Olivia Jean Martin',
    alias: 'The Bestfriend',
    lastKnownAddress: 'unknown',
    phoneNumber: '555-0189',
    photoUrl: '/media/mugshot/mugshot_Olivia.jpg',
    fingerprintUrl: '/media/fingerprints/fingerprint_Olivia.jpg',
    carId: 'CAR-001',
    notes: 'Witness picture available: wearing a leopard-print dress in muted beige and black.A fine gold chain bracelet adorned with tiny polished beads and a single luminous stone'
  },
  {
    id: 'CHAR-002',
    caseId: '2025-147',
    fullName: 'Rachel bennett',
    alias: 'Co-worker',
    lastKnownAddress: 'unknown',
    phoneNumber: '555-0298',
    photoUrl: '/media/mugshot/mugshot_Rachel.jpg',
    fingerprintUrl: '/media/fingerprints/fingerprint_Rachel.jpg',
    carId: 'CAR-002',
    notes: 'Claims she was not in good terms with rachel but that doesn\'t make her a killer'
  },
  {
    id: 'CHAR-003',
    caseId: '2025-147',
    fullName: 'Sarah Smith',
    alias: 'The sister',
    lastKnownAddress: '2847 Oak Avenue',
    phoneNumber: '555-8475',
    photoUrl: '/media/mugshot/mugshot_Sarah.jpg',
    fingerprintUrl: '/media/fingerprints/fingerprint_Sarah.jpg',
    carId: 'CAR-003',
    notes: 'provided witness statement in audio. Person seemed scared and hiding something.'
  },
  {
    id: 'CHAR-004',
    caseId: '2025-147',
    fullName: 'Derek Holloway',
    alias: 'The Date',
    lastKnownAddress: 'unknown',
    phoneNumber: '555-2748',
    photoUrl: '/media/mugshot/mugshot_Derek.jpg',
    fingerprintUrl: '/media/fingerprints/fingerprint_Derek.jpg',
    carId: 'CAR-004',
    notes: 'Met Jane the night of the incident. Claimed the evening ended early, but timeline details remain unclear.'
  },
  {
    id: 'CHAR-005',
    caseId: '2025-147',
    fullName: 'Travis Barett',
    alias: 'The Ex Boyfriend',
    lastKnownAddress: '2847 Weston Road',
    phoneNumber: '555-3921',
    photoUrl: '/media/mugshot/mugshot_Travis.jpg',
    fingerprintUrl: '/media/fingerprints/fingerprint_Travis.jpg',
    carId: 'CAR-005',
    notes: 'Criminal record: 2019 - Possession of Controlled Substance (Cocaine) - Convicted, 6 months probation 2020 - Domestic Disturbance - Charges dropped 2021 - Assault (Domestic) - Convicted, 1 year probation, anger management program mandated 2023 - Possession of Controlled Substance (Marijuana) - Charges dropped'
  },
  {
    id: 'CHAR-006',
    caseId: '2025-147',
    fullName: 'Vikash Banerjee',
    alias: 'The Uber Driver',
    lastKnownAddress: 'unknown',
    phoneNumber: '555-6103',
    photoUrl: '/media/mugshot/mugshot_Vikash.jpg',
    fingerprintUrl: '/media/fingerprints/fingerprint_Vikash.jpg',
    carId: 'CAR-006',
    notes: 'Statement saved as audio.'
  },

];

// Vehicles
export const cars: Car[] = [
  {
    id: 'CAR-001',
    caseId: '2025-147',
    licensePlate: 'KVL 723',
    make: 'Ford',
    model: 'Escape',
    color: 'Red',
    year: 2017,
    vinNumber: '1FMCU0GD7HUB39154',
    ownerId: 'CHAR-001'
  },
  {
    id: 'CAR-002',
    caseId: '2025-147',
    licensePlate: 'LPR 418',
    make: 'Honda',
    model: 'Civic',
    color: 'Black',
    year: 2016,
    vinNumber: '2HGFC2F59GH512784',
    ownerId: 'CHAR-005'
  },
  {
    id: 'CAR-003',
    caseId: '2025-147',
    licensePlate: 'JTK 662',
    make: 'Hyundai',
    model: 'Elantra',
    color: 'White',
    year: 2015,
    vinNumber: '5NPDH4AE1FH603218',
    ownerId: 'CHAR-003'
  },
  {
    id: 'CAR-004',
    caseId: '2025-147',
    licensePlate: 'GLD 990',
    make: 'BMW',
    model: '7 Series',
    color: 'Midnight Blue',
    year: 2022,
    vinNumber: 'WBA7U2C57NCG87421',
    ownerId: 'CHAR-004'
  },
  {
    id: 'CAR-005',
    caseId: '2025-147',
    licensePlate: 'QRS 517',
    make: 'Nissan',
    model: 'Altima',
    color: 'Grey',
    year: 2017,
    vinNumber: '1N4AL3AP5HC284659',
    ownerId: 'CHAR-005'
  },
  {
    id: 'CAR-006',
    caseId: '2025-147',
    licensePlate: 'BKJH 847',
    make: 'Toyota',
    model: 'Camry',
    color: 'Grey',
    year: 2018,
    vinNumber: '4T1B11HK5JU274839',
    ownerId: 'CHAR-006'
  },
];

// Evidence files
export const evidence: Evidence[] = [
  {
    id: 'EV-001',
    caseId: '2025-147',
    subjectName: '2849 Oak Avenue security camera',
    evidenceType: 'CCTV',
    description: 'Footage showing Jane being dropped off',
    videoUrl: 'media/video/video1.mov',
    timestamp: 'as stated'
  },
  {
    id: 'EV-002',
    caseId: '2025-147',
    subjectName: 'Olivia Martin',
    evidenceType: 'Audio Recording',
    description: 'Interview photo available for this witness statement',
    audioUrl: '/media/audio/audio1.mp3',
    timestamp: 'No timestamp'
  },
  {
    id: 'EV-003',
    caseId: '2025-147',
    subjectName: 'Sarah Smith',
    evidenceType: 'Audio Recording',
    description: 'Interview photo not available',
    audioUrl: '/media/audio/audio2.mp3',
    timestamp: 'No timestamp'
  },
  {
    id: 'EV-004',
    caseId: '2025-147',
    subjectName: 'Vikash Banerjee',
    evidenceType: 'Audio Recording',
    description: 'Interview photo not available',
    audioUrl: '/media/audio/audio4.mp3',
    timestamp: 'No timestamp'
  },
  {
    id: 'EV-005',
    caseId: '2025-147',
    subjectName: 'Maria Santos - Dock Worker',
    evidenceType: 'Witness Statement',
    description: 'Written statement regarding unusual shipments received in the past month',
    documentUrl: '/media/document/document1.pdf',
    timestamp: '-'
  },
  {
    id: 'EV-006',
    caseId: '2025-147',
    subjectName: '2849 Oak Avenue security camera',
    evidenceType: 'CCTV',
    description: 'Footage showing Jane getting into a car-time stamp missing',
    videoUrl: 'media/video/video2.mov',
    timestamp: '-'
  },
  {
    id: 'EV-007',
    caseId: '2025-147',
    subjectName: 'Surveillance Photo at 2849 Oak Avenue',
    evidenceType: 'Photo',
    description: 'Photo evidence of a licence plate',
    photoUrl: '/media/photo/photo1.png',
    timestamp: 'as stated'
  },
  {
    id: 'EV-008',
    caseId: '2025-147',
    subjectName: 'Surveillance Photo at 2849 Oak Avenue',
    evidenceType: 'Photo',
    description: 'Photo evidence of a licence plate',
    photoUrl: '/media/photo/photo2.png',
    timestamp: 'as stated'
  },
  {
    id: 'EV-009',
    caseId: '2025-147',
    subjectName: 'Olivia Martin',
    evidenceType: 'Photo',
    description: 'photo taking during audio statement',
    photoUrl: '/media/photo/photo3.png',
    timestamp: 'as stated'
  }
];

// Activity log for dashboard
export const activityLog = [
  { timestamp: '15:47:23', message: 'SYSTEM: Database synchronization complete' },
  { timestamp: '15:45:01', message: 'ALERT: New evidence uploaded - Case 2025-147' },
  { timestamp: '15:42:18', message: 'ACCESS: Det. Chen accessed suspect records' },
  { timestamp: '15:38:55', message: 'SYSTEM: Backup procedure initiated' },
  { timestamp: '15:35:22', message: 'UPDATE: Case 2025-145 status changed to CLOSED' },
];
