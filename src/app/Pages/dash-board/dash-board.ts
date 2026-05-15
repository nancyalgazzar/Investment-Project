import { Component } from '@angular/core';
import { SideBar } from "../../Components/side-bar/side-bar";
import { Header } from "../../Components/header/header";
import { OverView } from "../../Components/over-view/over-view";

@Component({
  selector: 'app-dash-board',
  imports: [SideBar, Header, OverView],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {}
