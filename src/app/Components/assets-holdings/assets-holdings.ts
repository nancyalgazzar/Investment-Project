import { Component } from '@angular/core';
import { AssetCard } from "../asset-card/asset-card";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-assets-holdings',
  imports: [AssetCard, RouterLink],
  templateUrl: './assets-holdings.html',
  styleUrl: './assets-holdings.css',
})
export class AssetsHoldings {}
