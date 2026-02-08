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
  evidenceType: 'Witness Statement' | 'CCTV' | 'Audio Recording' | 'Document';
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  timestamp: string;
}

// Authorized detectives
export const detectives: Detective[] = [
  {
    badgeNumber: 'ABSDE',
    password: '152689',
    name: 'Detective Martinez',
    rank: 'Senior Detective'
  }
];

// Case files
export const cases: Case[] = [
  {
    id: 'ALPHA-0116',
    caseName: 'Case Alpha#0116',
    accessCode: 'GAMMA7',
    status: 'Open',
    description: 'Missing persons investigation - High priority. Multiple witnesses reported unusual activity near the harbor district.',
    dateOpened: '2024-01-16'
  },
  {
    id: 'BETA-0089',
    caseName: 'Case Beta#0089',
    accessCode: 'DELTA3',
    status: 'Closed',
    description: 'Corporate espionage - Resolved. Suspect apprehended and evidence secured.',
    dateOpened: '2023-11-02'
  },
  {
    id: 'OMEGA-0234',
    caseName: 'Case Omega#0234',
    accessCode: 'SIGMA9',
    status: 'Open',
    description: 'Art theft from municipal gallery. Insurance claim pending investigation.',
    dateOpened: '2024-02-01'
  }
];

// Characters/Suspects
export const characters: Character[] = [
  {
    id: 'CHAR-001',
    caseId: 'ALPHA-0116',
    fullName: 'Marcus Webb',
    alias: 'The Broker',
    lastKnownAddress: '1847 Harbor View Dr, Apt 12B',
    phoneNumber: '555-0147',
    photoUrl: '/placeholder.svg',
    fingerprintUrl: '/placeholder.svg',
    carId: 'CAR-001',
    notes: 'Known associate of underground networks. Last seen near pier 7.'
  },
  {
    id: 'CHAR-002',
    caseId: 'ALPHA-0116',
    fullName: 'Elena Vasquez',
    lastKnownAddress: '2301 Industrial Blvd, Unit 5',
    phoneNumber: '555-0298',
    photoUrl: '/placeholder.svg',
    fingerprintUrl: '/placeholder.svg',
    carId: 'CAR-002',
    notes: 'Warehouse manager. Claims no knowledge of after-hours activities.'
  },
  {
    id: 'CHAR-003',
    caseId: 'OMEGA-0234',
    fullName: 'Theodore Crane',
    alias: 'The Collector',
    lastKnownAddress: '890 Uptown Ave, Penthouse',
    phoneNumber: '555-0456',
    photoUrl: '/placeholder.svg',
    notes: 'Art dealer with connections to black market. Alibi under investigation.'
  }
];

// Vehicles
export const cars: Car[] = [
  {
    id: 'CAR-001',
    caseId: 'ALPHA-0116',
    licensePlate: 'XK7-4921',
    make: 'Chevrolet',
    model: 'Impala',
    color: 'Black',
    year: 2019,
    vinNumber: '1G1YY22G965109876',
    ownerId: 'CHAR-001'
  },
  {
    id: 'CAR-002',
    caseId: 'ALPHA-0116',
    licensePlate: 'MN3-8847',
    make: 'Ford',
    model: 'Transit',
    color: 'White',
    year: 2021,
    vinNumber: '1FTBW2CM4JKA45678',
    ownerId: 'CHAR-002'
  },
  {
    id: 'CAR-003',
    caseId: 'OMEGA-0234',
    licensePlate: 'VIP-0001',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    color: 'Silver',
    year: 2023,
    vinNumber: 'WDDUG8CB2LA567890',
    ownerId: 'CHAR-003'
  }
];

// Evidence files
export const evidence: Evidence[] = [
  {
    id: 'EV-001',
    caseId: 'ALPHA-0116',
    subjectName: 'Harbor Security Camera #7',
    evidenceType: 'CCTV',
    description: 'Footage showing unidentified vehicle near pier 7 at 23:47',
    videoUrl: 'public/media/photo/video1.mov',
    timestamp: '2024-01-15 23:47:00'
  },
  {
    id: 'EV-002',
    caseId: 'ALPHA-0116',
    subjectName: 'Anonymous Caller',
    evidenceType: 'Audio Recording',
    description: 'Tip line recording - Caller claims to have witnessed suspicious loading activity',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    timestamp: '2024-01-16 08:15:00'
  },
  {
    id: 'EV-003',
    caseId: 'ALPHA-0116',
    subjectName: 'Maria Santos - Dock Worker',
    evidenceType: 'Witness Statement',
    description: 'Written statement regarding unusual shipments received in the past month',
    timestamp: '2024-01-17 14:30:00'
  },
  {
    id: 'EV-004',
    caseId: 'OMEGA-0234',
    subjectName: 'Gallery Security System',
    evidenceType: 'CCTV',
    description: 'Footage shows system malfunction at 02:13 - possible EMP device used',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    timestamp: '2024-02-01 02:13:00'
  }
];

// Activity log for dashboard
export const activityLog = [
  { timestamp: '15:47:23', message: 'SYSTEM: Database synchronization complete' },
  { timestamp: '15:45:01', message: 'ALERT: New evidence uploaded - Case ALPHA-0116' },
  { timestamp: '15:42:18', message: 'ACCESS: Det. Chen accessed suspect records' },
  { timestamp: '15:38:55', message: 'SYSTEM: Backup procedure initiated' },
  { timestamp: '15:35:22', message: 'UPDATE: Case BETA-0089 status changed to CLOSED' },
  { timestamp: '15:30:00', message: 'LOGIN: Authorized access - Badge #4472' },
  { timestamp: '15:28:47', message: 'QUERY: License plate search - MN3-8847' },
  { timestamp: '15:25:11', message: 'SYSTEM: Security scan complete - No threats' },
];
