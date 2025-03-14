import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Bank } from '../../../core/domain/bank.model';
import { ManageCertificatesUseCase } from '../../../core/use-cases/manage-certificates.use-case';

/**
 * Settings component for managing certificates and application settings
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule
  ]
})
export class SettingsComponent implements OnInit {
  /**
   * Certificate upload form
   */
  certificateForm!: FormGroup;
  
  /**
   * Flag to indicate if certificate is being uploaded
   */
  isUploading = false;
  
  /**
   * Flag to indicate if certificate is being downloaded
   */
  isDownloading = false;
  
  /**
   * List of authorized banks
   */
  authorizedBanks: Bank[] = [
    { id: 'B001', name: 'Global Bank', isAuthorized: true },
    { id: 'B002', name: 'National Trust', isAuthorized: true },
    { id: 'B004', name: 'Metro Credit Union', isAuthorized: true }
  ];
  
  /**
   * Selected file for upload
   */
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private manageCertificatesUseCase: ManageCertificatesUseCase
  ) {}

  ngOnInit(): void {
    this.initCertificateForm();
  }
  
  /**
   * Initialize the certificate form
   */
  private initCertificateForm(): void {
    this.certificateForm = this.fb.group({
      bankId: ['', Validators.required]
    });
  }
  
  /**
   * Handle file selection
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }
  
  /**
   * Upload certificate
   */
  uploadCertificate(): void {
    if (this.certificateForm.invalid || !this.selectedFile) {
      return;
    }
    
    const bankId = this.certificateForm.get('bankId')?.value;
    
    this.isUploading = true;
    
    this.manageCertificatesUseCase.uploadCertificate(
      bankId,
      this.selectedFile
    ).subscribe({
      next: (success) => {
        this.isUploading = false;
        if (success) {
          // Show success message (would use a real notification service in production)
          console.log('Certificate uploaded successfully');
          this.certificateForm.reset();
          this.selectedFile = null;
        }
      },
      error: (error) => {
        this.isUploading = false;
        // Show error message (would use a real notification service in production)
        console.error('Error uploading certificate:', error);
      }
    });
  }
  
  /**
   * Download certificate
   */
  downloadCertificate(bankId: string, bankName: string): void {
    this.isDownloading = true;
    
    this.manageCertificatesUseCase.downloadCertificate(bankId).subscribe({
      next: (blob) => {
        this.isDownloading = false;
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${bankName.replace(/\s+/g, '-').toLowerCase()}-certificate.pem`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        
        // Show success message (would use a real notification service in production)
        console.log('Certificate downloaded successfully');
      },
      error: (error) => {
        this.isDownloading = false;
        // Show error message (would use a real notification service in production)
        console.error('Error downloading certificate:', error);
      }
    });
  }
}
