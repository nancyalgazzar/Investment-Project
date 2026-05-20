import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './../../Services/api';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private refreshSub!: Subscription;

  totalNetWorth: number = 0;
  avaliableLiquidity: number = 0;
  private totalInvestments: number = 0;

   ngOnInit() {
    this.loadUserData();

    this.refreshSub = this.apiService.refresh$.subscribe(() => {    // Listen for any payment updates and silently reload data

      this.loadUserData();
    });
  }
  ngOnDestroy() {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

  loadUserData() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      const user = Array.isArray(userObj) ? userObj[0] : userObj;

      this.apiService.getUser(user.id).subscribe({    //   // Fetch real liquidity from the Users table

        next: (userData) => {
          this.avaliableLiquidity = userData.liquidity || 0;
          this.calculateNetWorth();
        }
      });

      // Fetch the total assets from user_projects
      this.apiService.getUserInvestments(user.id).subscribe({
        next: (investments) => {
          this.totalInvestments = investments.reduce((sum, item) => sum + Number(item.invested_amount), 0);
          this.calculateNetWorth();
        }
      });
    }
  }

  // Calculate Net Worth = Cash on hand + Value of Investments
  calculateNetWorth() {
    this.totalNetWorth = this.avaliableLiquidity + this.totalInvestments;
    this.cdr.detectChanges();
  }
}
