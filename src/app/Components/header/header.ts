import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from './../../Services/api';

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private apiService = inject(ApiService);

  totalNetWorth: number = 0;
  avaliableLiquidity: number = 500000; // Left static for this iteration chunk

  ngOnInit() {
    // Read local database for test mock user id 1
    this.apiService.getUserInvestments(1).subscribe({
      next: (investments) => {
        // Automatically aggregate total balances on layout generation
        this.totalNetWorth = investments.reduce((sum, current) => sum + current.invested_amount, 0);
      }
    });
  }
}
