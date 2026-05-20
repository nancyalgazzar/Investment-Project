import { ApiService } from './../../Services/api';
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { AssetCard } from '../asset-card/asset-card';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-assets-holdings',
  imports: [AssetCard],
  templateUrl: './assets-holdings.html',
  styleUrl: './assets-holdings.css',
})
export class AssetsHoldings implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private refreshSub!: Subscription;

  myInvestments: any[] = [];

  ngOnInit() {
    this.loadInvestments();
    // React to new purchases
    this.refreshSub = this.apiService.refresh$.subscribe(() => this.loadInvestments());
  }

  ngOnDestroy() {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

  loadInvestments() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      const user = Array.isArray(userObj) ? userObj[0] : userObj;

      this.apiService.getUserInvestments(user.id).subscribe({
        next: (investments) => {
          this.myInvestments = investments;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
