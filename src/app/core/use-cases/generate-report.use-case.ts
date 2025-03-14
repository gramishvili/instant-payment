import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';
import { TRANSACTION_REPOSITORY } from '../interfaces/repository.tokens';

/**
 * Use case for generating transaction reports
 * Following the Use Case pattern from Clean Architecture
 */
@Injectable({
  providedIn: 'root'
})
export class GenerateReportUseCase {
  constructor(@Inject(TRANSACTION_REPOSITORY) private transactionRepository: ITransactionRepository) {}

  /**
   * Execute the use case to generate a report for transactions within a date range
   * @param startDate Start date for report
   * @param endDate End date for report
   * @returns Observable of string (report URL or data)
   */
  execute(startDate: Date, endDate: Date): Observable<string> {
    // Validate that at least one date is provided
    if (!startDate && !endDate) {
      throw new Error('At least one date parameter is required for report generation');
    }
    
    return this.transactionRepository.generateReport(startDate, endDate);
  }
}
