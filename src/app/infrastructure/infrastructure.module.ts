import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Repository tokens
import { 
  TRANSACTION_REPOSITORY,
  BANK_REPOSITORY,
  STATUS_REPOSITORY
} from '../core/interfaces/repository.tokens';

// Mock repository implementations
import { MockTransactionRepository } from './repositories/mock-transaction.repository';
import { MockBankRepository } from './repositories/mock-bank.repository';
import { MockStatusRepository } from './repositories/mock-status.repository';

/**
 * Infrastructure module providing repository implementations
 * Following the Dependency Inversion Principle from SOLID
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Provide concrete implementations for repository interfaces using tokens
    { provide: TRANSACTION_REPOSITORY, useClass: MockTransactionRepository },
    { provide: BANK_REPOSITORY, useClass: MockBankRepository },
    { provide: STATUS_REPOSITORY, useClass: MockStatusRepository }
  ]
})
export class InfrastructureModule { }
