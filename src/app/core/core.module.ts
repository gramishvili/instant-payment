import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use cases
import { GetTransactionsUseCase } from './use-cases/get-transactions.use-case';
import { GenerateReportUseCase } from './use-cases/generate-report.use-case';
import { ManageCertificatesUseCase } from './use-cases/manage-certificates.use-case';

/**
 * Core module containing domain models, interfaces, and use cases
 * Following the Clean Architecture pattern
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Use cases
    GetTransactionsUseCase,
    GenerateReportUseCase,
    ManageCertificatesUseCase
  ]
})
export class CoreModule { }
