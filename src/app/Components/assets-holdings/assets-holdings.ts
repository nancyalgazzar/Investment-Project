import { ApiService } from './../../Services/api';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { AssetCard } from '../asset-card/asset-card';

@Component({
  standalone: true,
  selector: 'app-assets-holdings',
  imports: [AssetCard],
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
        this.cdr.detectChanges();
      }
    });
  }
}
