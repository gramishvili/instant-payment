import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Bank, BankMap } from '../../core/domain/bank.model';
import { IBankRepository } from '../../core/interfaces/bank-repository.interface';

/**
 * Mock implementation of the Bank Repository
 * Used for testing and development purposes
 */
@Injectable({
  providedIn: 'root'
})
export class MockBankRepository implements IBankRepository {
  // Mock data for banks
  private banks: Bank[] = [
    {
      id: 'B001',
      name: 'Global Bank',
      code: 'GLBK',
      isAuthorized: true
    },
    {
      id: 'B002',
      name: 'National Trust',
      code: 'NTRS',
      isAuthorized: true
    },
    {
      id: 'B003',
      name: 'City Finance',
      code: 'CTYF',
      isAuthorized: false
    },
    {
      id: 'B004',
      name: 'Metro Credit Union',
      code: 'MCUN',
      isAuthorized: true
    },
    {
      id: 'B005',
      name: 'Regional Savings',
      code: 'RGSV',
      isAuthorized: false
    }
  ];

  /**
   * Get all banks
   * @returns Observable of Bank array
   */
  getBanks(): Observable<Bank[]> {
    // Simulate network delay
    return of(this.banks).pipe(delay(500));
  }

  /**
   * Get a bank by ID
   * @param id Bank ID
   * @returns Observable of Bank
   */
  getBankById(id: string): Observable<Bank> {
    const bank = this.banks.find(b => b.id === id);
    
    if (!bank) {
      return throwError(() => new Error(`Bank with ID ${id} not found`));
    }
    
    // Simulate network delay
    return of(bank).pipe(delay(300));
  }

  /**
   * Get a mapping of bank IDs to names for dropdown selections
   * @returns Observable of BankMap (Record<string, string>)
   */
  getBankMap(): Observable<BankMap> {
    const bankMap: BankMap = {};
    
    this.banks.forEach(bank => {
      bankMap[bank.id] = bank.name;
    });
    
    // Simulate network delay
    return of(bankMap).pipe(delay(300));
  }

  /**
   * Upload a key/certificate for an authorized bank
   * @param bankId Bank ID
   * @param file File to upload
   * @returns Observable of boolean indicating success
   */
  uploadCertificate(bankId: string, file: File): Observable<boolean> {
    const bank = this.banks.find(b => b.id === bankId);
    
    if (!bank) {
      return throwError(() => new Error(`Bank with ID ${bankId} not found`));
    }
    
    if (!bank.isAuthorized) {
      return throwError(() => new Error(`Bank with ID ${bankId} is not authorized for certificate operations`));
    }
    
    // Simulate successful upload
    // Simulate network delay
    return of(true).pipe(delay(1000));
  }

  /**
   * Download a key/certificate for an authorized bank
   * @param bankId Bank ID
   * @returns Observable of Blob containing the certificate
   */
  downloadCertificate(bankId: string): Observable<Blob> {
    const bank = this.banks.find(b => b.id === bankId);
    
    if (!bank) {
      return throwError(() => new Error(`Bank with ID ${bankId} not found`));
    }
    
    if (!bank.isAuthorized) {
      return throwError(() => new Error(`Bank with ID ${bankId} is not authorized for certificate operations`));
    }
    
    // Simulate certificate data
    const certificateData = `-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----`;
    
    const blob = new Blob([certificateData], { type: 'application/x-pem-file' });
    
    // Simulate network delay
    return of(blob).pipe(delay(800));
  }
}
