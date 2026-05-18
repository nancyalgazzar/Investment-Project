import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-asset-card',
  imports: [CurrencyPipe],
  templateUrl: './asset-card.html',
  styleUrl: './asset-card.css'
})
export class AssetCard {
  @Input() data: any;
}
