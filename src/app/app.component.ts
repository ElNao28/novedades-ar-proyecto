import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'novedades-ar';
}

export const environment = {
  production: false,
  enableCaptcha: false, // Deshabilita CAPTCHA en desarrollo
};
