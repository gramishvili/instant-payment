/**
 * Currency model representing available currencies in the system
 */
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

/**
 * Predefined currencies available in the system
 */
export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾' }
];
