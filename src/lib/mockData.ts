export interface GeoObject {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  frameRef?: string;
  projectId: string;
  area: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  objectCount: number;
  lastUpdated: string;
  area: string;
}

export const objectTypes = [
  'Tree',
  'Light Pole',
  'Dustbin',
  'Road Sign',
  'Fire Hydrant',
  'Bench',
  'Utility Box',
  'Manhole Cover',
  'Traffic Signal',
  'Bus Stop',
];

export const lagosAreas = [
  'Lekki',
  'Victoria Island',
  'Ikoyi',
  'Ikeja',
  'Surulere',
  'Yaba',
  'Ajah',
  'Apapa',
  'Oshodi',
  'Festac Town',
  'Mushin',
  'Lagos Island',
];

// Base coordinates for each Lagos area
const areaCoords: Record<string, { lat: number; lng: number }> = {
  'Lekki': { lat: 6.4698, lng: 3.5852 },
  'Victoria Island': { lat: 6.4281, lng: 3.4219 },
  'Ikoyi': { lat: 6.4520, lng: 3.4350 },
  'Ikeja': { lat: 6.6018, lng: 3.3515 },
  'Surulere': { lat: 6.5059, lng: 3.3509 },
  'Yaba': { lat: 6.5158, lng: 3.3752 },
  'Ajah': { lat: 6.4667, lng: 3.6000 },
  'Apapa': { lat: 6.4488, lng: 3.3590 },
  'Oshodi': { lat: 6.5569, lng: 3.3414 },
  'Festac Town': { lat: 6.4667, lng: 3.2833 },
  'Mushin': { lat: 6.5374, lng: 3.3563 },
  'Lagos Island': { lat: 6.4541, lng: 3.3947 },
};

export const projects: Project[] = [
  { id: 'p1', name: 'Lekki Corridor Survey', location: 'Lekki, Lagos', objectCount: 342, lastUpdated: '2026-02-10', area: 'Lekki' },
  { id: 'p2', name: 'VI Road Audit', location: 'Victoria Island, Lagos', objectCount: 187, lastUpdated: '2026-02-08', area: 'Victoria Island' },
  { id: 'p3', name: 'Ikeja Infrastructure Map', location: 'Ikeja, Lagos', objectCount: 95, lastUpdated: '2026-01-28', area: 'Ikeja' },
  { id: 'p4', name: 'Surulere Asset Survey', location: 'Surulere, Lagos', objectCount: 120, lastUpdated: '2026-02-12', area: 'Surulere' },
  { id: 'p5', name: 'Yaba Urban Mapping', location: 'Yaba, Lagos', objectCount: 78, lastUpdated: '2026-02-05', area: 'Yaba' },
  { id: 'p6', name: 'Apapa Port Zone Scan', location: 'Apapa, Lagos', objectCount: 156, lastUpdated: '2026-01-30', area: 'Apapa' },
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function generateObjects(projectId: string, count: number, area: string): GeoObject[] {
  const base = areaCoords[area] || { lat: 6.5244, lng: 3.3792 };
  return Array.from({ length: count }, (_, i) => ({
    id: `${projectId}-obj-${String(i + 1).padStart(4, '0')}`,
    type: objectTypes[Math.floor(Math.random() * objectTypes.length)],
    latitude: Number((base.lat + rand(-0.008, 0.008)).toFixed(6)),
    longitude: Number((base.lng + rand(-0.008, 0.008)).toFixed(6)),
    frameRef: `FRM-${String(Math.floor(rand(1, 9999))).padStart(4, '0')}`,
    projectId,
    area,
  }));
}

export const allObjects: GeoObject[] = [
  ...generateObjects('p1', 50, 'Lekki'),
  ...generateObjects('p2', 30, 'Victoria Island'),
  ...generateObjects('p3', 20, 'Ikeja'),
  ...generateObjects('p4', 25, 'Surulere'),
  ...generateObjects('p5', 15, 'Yaba'),
  ...generateObjects('p6', 30, 'Apapa'),
];
