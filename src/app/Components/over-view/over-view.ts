import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Plugin } from 'chart.js';
import { ApiService } from './../../Services/api';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-over-view',
  imports: [BaseChartDirective],
  templateUrl: './over-view.html',
  styleUrl: './over-view.css',
})
export class OverView implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private refreshSub!: Subscription;

  activeAssetsCount: number = 0;
  userName: string = 'Investor';

  chartData: any = {
    labels: [],
    datasets: [{ data: [0], backgroundColor: ['#232323'], cutout: '80%' }],
  };

  chartOptions = { responsive: true, maintainAspectRatio: false };

  ngOnInit() {
    this.loadData();
    // React to new purchases
    this.refreshSub = this.apiService.refresh$.subscribe(() => this.loadData());
  }

  ngOnDestroy() {
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

  loadData() {
    const userStorage = localStorage.getItem('currentUser');
    if (userStorage) {
      const userObj = JSON.parse(userStorage);
      const currentUser = Array.isArray(userObj) ? userObj[0] : userObj;

      this.userName = currentUser.firstName || 'Investor';
      const currentUserId = currentUser.id;

      this.apiService.getUserInvestments(currentUserId).subscribe({
        next: (investments) => {
          this.activeAssetsCount = investments.length;
          if (investments.length > 0) {
            const variableDataPoints = investments.map((item) => Number(item.invested_amount));
            this.chartData = {
              datasets: [{
                data: variableDataPoints,
                backgroundColor: ['#D4AF37', '#137ABF', '#4edea3'],
                cutout: '80%',
              }],
            };
          }
          this.cdr.detectChanges();
        },
      });
    }
  }

  centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    afterDraw(chart) {
      const { ctx, chartArea: { top, width, height } } = chart;
      ctx.save();
      ctx.font = '1em Arial';
      ctx.fillStyle = 'grey';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Profile', width / 2, top + height / 2 - 10);
      ctx.font = 'bold 2em Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('Active', width / 2, top + height / 2 + 20);
      ctx.restore();
    },
  };
}
