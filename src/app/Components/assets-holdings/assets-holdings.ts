import { ApiService } from './../../Services/api';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { AssetCard } from '../asset-card/asset-card';

@Component({
  standalone: true,
  selector: 'app-assets-holdings',
  imports: [AssetCard],
  templateUrl: './assets-holdings.html',
  styleUrl: './assets-holdings.css',
})
export class AssetsHoldings implements OnInit {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  myInvestments: any[] = [];

  ngOnInit() {
    // Get the current logged in user
    // const userStr = localStorage.getItem('currentUser');

    // if (userStr) {
    //   const user = JSON.parse(userStr);

    //   this.apiService.getUserInvestments(user.id).subscribe({
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      const user = Array.isArray(userObj) ? userObj[0] : userObj;

      this.apiService.getUserInvestments(user.id).subscribe({     // Fetch data for this specific user

        next: (investments) => {
          this.myInvestments = investments;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
