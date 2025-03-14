import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBankRepository } from '../interfaces/bank-repository.interface';
import { BANK_REPOSITORY } from '../interfaces/repository.tokens';

/**
 * Use case for managing bank certificates
 * Following the Use Case pattern from Clean Architecture
 */
@Injectable({
  providedIn: 'root'
})
export class ManageCertificatesUseCase {
  constructor(@Inject(BANK_REPOSITORY) private bankRepository: IBankRepository) {}

  /**
   * Execute the use case to upload a certificate for an authorized bank
   * @param bankId Bank ID
   * @param file File to upload
   * @returns Observable of boolean indicating success
   */
  uploadCertificate(bankId: string, file: File): Observable<boolean> {
    if (!bankId) {
      throw new Error('Bank ID is required for certificate upload');
    }
    
    if (!file) {
      throw new Error('File is required for certificate upload');
    }
    
    return this.bankRepository.uploadCertificate(bankId, file);
  }
  
  /**
   * Execute the use case to download a certificate for an authorized bank
   * @param bankId Bank ID
   * @returns Observable of Blob containing the certificate
   */
  downloadCertificate(bankId: string): Observable<Blob> {
    if (!bankId) {
      throw new Error('Bank ID is required for certificate download');
    }
    
    return this.bankRepository.downloadCertificate(bankId);
  }
}
