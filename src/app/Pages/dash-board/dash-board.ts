import { Component } from '@angular/core';
import { SideBar } from "../../Components/side-bar/side-bar";
import { Header } from "../../Components/header/header";
import { OverView } from "../../Components/over-view/over-view";
import { AssetsHoldings } from "../../Components/assets-holdings/assets-holdings";

@Component({
  selector: 'app-dash-board',
  imports: [SideBar, Header, OverView, AssetsHoldings],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {}
