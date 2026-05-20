import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './Components/toast/toast';
import { SplashScreen } from './Components/splash-screen/splash-screen';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, SplashScreen],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  showSplash = signal(true);
  ngOnInit() {
    setTimeout(() => {
      this.showSplash.set(false);
    }, 3500);
  }
}
