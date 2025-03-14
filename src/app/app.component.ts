import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PresentationModule } from './presentation/presentation.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PresentationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'modern-dashboard';
}
