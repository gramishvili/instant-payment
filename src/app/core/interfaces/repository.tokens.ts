import { InjectionToken } from '@angular/core';
import { ITransactionRepository } from './transaction-repository.interface';
import { IBankRepository } from './bank-repository.interface';
import { IStatusRepository } from './status-repository.interface';

/**
 * Injection tokens for repository interfaces
 * These tokens allow us to use dependency injection with interfaces
 */
export const TRANSACTION_REPOSITORY = new InjectionToken<ITransactionRepository>('TransactionRepository');
export const BANK_REPOSITORY = new InjectionToken<IBankRepository>('BankRepository');
export const STATUS_REPOSITORY = new InjectionToken<IStatusRepository>('StatusRepository');
