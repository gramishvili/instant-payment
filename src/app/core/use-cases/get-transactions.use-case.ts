import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction, TransactionFilter } from '../domain/transaction.model';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';
import { TRANSACTION_REPOSITORY } from '../interfaces/repository.tokens';

/**
 * Use case for retrieving transactions with optional filtering
 * Following the Use Case pattern from Clean Architecture
 */
@Injectable({
  providedIn: 'root'
})
export class GetTransactionsUseCase {
  constructor(@Inject(TRANSACTION_REPOSITORY) private transactionRepository: ITransactionRepository) {}

  /**
   * Execute the use case to get transactions with optional filtering
   * @param filter Optional filter criteria
   * @returns Observable of Transaction array
   */
  execute(filter?: TransactionFilter): Observable<Transaction[]> {
    return this.transactionRepository.getTransactions(filter);
  }
}
