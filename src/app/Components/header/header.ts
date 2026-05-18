import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './../../Services/api';
import { RouterLink } from '@angular/router'; // Gamal
@Component({
  selector: 'app-header',
  imports: [CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  totalNetWorth: number = 0;
  avaliableLiquidity: number = 500000;

  ngOnInit() {
    this.apiService.getUserInvestments(1).subscribe({
      next: (investments) => {
        this.totalNetWorth = investments.reduce((sum, item) => sum + Number(item.invested_amount), 0);
        this.cdr.detectChanges();
      }
    });
  }
}
