import { Observable } from 'rxjs';
import { Transaction, TransactionFilter } from '../domain/transaction.model';

/**
 * Repository interface for Transaction operations
 * Following the Repository pattern from Clean Architecture
 */
export interface ITransactionRepository {
  /**
   * Get all transactions with optional filtering
   * @param filter Optional filter criteria
   * @returns Observable of Transaction array
   */
  getTransactions(filter?: TransactionFilter): Observable<Transaction[]>;
  
  /**
   * Get a transaction by ID
   * @param id Transaction ID
   * @returns Observable of Transaction
   */
  getTransactionById(id: string): Observable<Transaction>;
  
  /**
   * Generate a report for transactions within a date range
   * @param startDate Start date for report
   * @param endDate End date for report
   * @returns Observable of string (report URL or data)
   */
  generateReport(startDate: Date, endDate: Date): Observable<string>;
}
