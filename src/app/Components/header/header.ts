import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './../../Services/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  totalNetWorth: number = 0;
  avaliableLiquidity: number = 500000;

  ngOnInit() {
    const userStorage = localStorage.getItem('currentUser');

    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      const currentUserId = Array.isArray(userObj) ? userObj[0].id : userObj.id;

      this.apiService.getUserInvestments(currentUserId).subscribe({
        next: (investments) => {
          this.totalNetWorth = investments.reduce(
            (sum, item) => sum + Number(item.invested_amount),
            0,
          );
          this.cdr.detectChanges();
        },
      });
    }
  }
}
