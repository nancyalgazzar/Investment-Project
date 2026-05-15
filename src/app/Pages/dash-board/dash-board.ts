import { Component } from '@angular/core';
import { SideBar } from "../../Components/side-bar/side-bar";
import { Header } from "../../Components/header/header";

@Component({
  selector: 'app-dash-board',
  imports: [SideBar, Header],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {}
