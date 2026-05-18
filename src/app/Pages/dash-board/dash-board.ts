import { Component } from '@angular/core';
import { OverView } from "../../Components/over-view/over-view";
import { AssetsHoldings } from "../../Components/assets-holdings/assets-holdings";

@Component({
  selector: 'app-dash-board',
  imports: [OverView, AssetsHoldings],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {}
