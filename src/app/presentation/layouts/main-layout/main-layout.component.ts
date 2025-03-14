import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

/**
 * Main layout component for the application
 * Contains the sidebar, header, and content area
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ]
})
export class MainLayoutComponent {
  /**
   * Flag to control sidebar visibility on mobile
   */
  isSidebarOpen = true;

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
