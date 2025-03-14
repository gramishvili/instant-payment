/**
 * Bank model representing financial institutions in the system
 */
export interface Bank {
  id: string;
  name: string;
  code?: string;
  isAuthorized?: boolean;
}

/**
 * Bank mapping for dropdown selections
 */
export type BankMap = Record<string, string>;
