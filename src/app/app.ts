import { Component, signal } from '@angular/core';
import { SideBar } from "./Components/side-bar/side-bar";

@Component({
  selector: 'app-root',
  imports: [ SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
