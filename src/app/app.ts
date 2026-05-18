import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Components/header/header";
import { SideBar } from "./Components/side-bar/side-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
