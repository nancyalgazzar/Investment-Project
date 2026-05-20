import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Plugin } from 'chart.js';
import { ApiService } from './../../Services/api';

@Component({
  standalone: true,
  selector: 'app-over-view',
  imports: [BaseChartDirective],
  templateUrl: './over-view.html',
  styleUrl: './over-view.css',
})
export class OverView implements OnInit {
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  activeAssetsCount: number = 0;
  userName: string = 'Investor'; // <-- Added property for the dynamic greeting

  // Default blank state for the chart
  chartData: any = {
    labels: [],
    datasets: [
      {
        data: [0],
        backgroundColor: ['#232323'],
        cutout: '80%',
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit() {
    const userStorage = localStorage.getItem('currentUser');

    if (userStorage) {
      const userObj = JSON.parse(userStorage);

      // Extract the full user object (whether it's inside an array or not)
      const currentUser = Array.isArray(userObj) ? userObj[0] : userObj;

      // Set the dynamic name and ID
      this.userName = currentUser.firstName || 'Investor';
      const currentUserId = currentUser.id;

      this.apiService.getUserInvestments(currentUserId).subscribe({
        next: (investments) => {
          this.activeAssetsCount = investments.length;

          if (investments.length > 0) {
            const variableDataPoints = investments.map((item) => Number(item.invested_amount));

            this.chartData = {
              datasets: [
                {
                  data: variableDataPoints,
                  backgroundColor: ['#D4AF37', '#137ABF', '#4edea3'],
                  cutout: '80%',
                },
              ],
            };
          }

          this.cdr.detectChanges();
        },
      });
    }
  }

  // This plugin draws the text in the middle of the doughnut hole
  centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    afterDraw(chart) {
      const {
        ctx,
        chartArea: { top, width, height },
      } = chart;
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
