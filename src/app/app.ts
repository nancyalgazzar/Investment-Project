import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Components/header/header";
import { Footer } from "./Components/footer/footer";
import { SideBar } from "./Components/side-bar/side-bar";
import { Toast } from './Components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, SideBar,Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
