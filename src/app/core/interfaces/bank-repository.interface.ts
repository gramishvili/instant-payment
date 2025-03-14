import { Observable } from 'rxjs';
import { Bank, BankMap } from '../domain/bank.model';

/**
 * Repository interface for Bank operations
 * Following the Repository pattern from Clean Architecture
 */
export interface IBankRepository {
  /**
   * Get all banks
   * @returns Observable of Bank array
   */
  getBanks(): Observable<Bank[]>;
  
  /**
   * Get a bank by ID
   * @param id Bank ID
   * @returns Observable of Bank
   */
  getBankById(id: string): Observable<Bank>;
  
  /**
   * Get a mapping of bank IDs to names for dropdown selections
   * @returns Observable of BankMap (Record<string, string>)
   */
  getBankMap(): Observable<BankMap>;
  
  /**
   * Upload a key/certificate for an authorized bank
   * @param bankId Bank ID
   * @param file File to upload
   * @returns Observable of boolean indicating success
   */
  uploadCertificate(bankId: string, file: File): Observable<boolean>;
  
  /**
   * Download a key/certificate for an authorized bank
   * @param bankId Bank ID
   * @returns Observable of Blob containing the certificate
   */
  downloadCertificate(bankId: string): Observable<Blob>;
}
