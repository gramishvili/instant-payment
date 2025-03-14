/**
 * Status model representing transaction statuses in the system
 */
export interface Status {
  id: string;
  name: string;
  color?: string;
}

/**
 * Status mapping for dropdown selections
 */
export type StatusMap = Record<string, string>;

/**
 * Predefined statuses available in the system
 */
export const STATUSES: Status[] = [
  { id: '1', name: 'Pending', color: '#FFC107' },
  { id: '2', name: 'Completed', color: '#4CAF50' },
  { id: '3', name: 'Failed', color: '#F44336' },
  { id: '4', name: 'Cancelled', color: '#9E9E9E' }
];
