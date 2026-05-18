import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ApiService } from './../../Services/api';
import { AssetCard } from "../asset-card/asset-card";

@Component({
  selector: 'app-assets-holdings',
  imports: [CurrencyPipe, AssetCard],
  templateUrl: './assets-holdings.html',
  styleUrl: './assets-holdings.css'
})
export class AssetsHoldings implements OnInit {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  myInvestments: any[] = [];

  ngOnInit() {
    this.apiService.getUserInvestments(1).subscribe({
      next: (investments) => {
        this.myInvestments = investments;
        console.log("ASSET HOLDINGS DATA:", investments);
        this.cdr.detectChanges();
      }
    });
  }
}
