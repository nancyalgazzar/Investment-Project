import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-asset-card',
  imports: [CurrencyPipe],
  templateUrl: './asset-card.html',
  styleUrl: './asset-card.css',
})
export class AssetCard {

  assetAmount: number = 50000;
}
