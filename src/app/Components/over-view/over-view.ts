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

  // Default blank state for the chart
  chartData: any = {
    labels: [],
    datasets: [{
      data: [0],
      backgroundColor: ['#232323'],
      cutout: '80%',
    }],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnInit() {
    this.apiService.getUserInvestments(1).subscribe({
      next: (investments) => {
        this.activeAssetsCount = investments.length; // Counts how many projects you have

        if (investments.length > 0) {
          // This grabs JUST the money amounts to draw the chart slices
          const variableDataPoints = investments.map(item => Number(item.invested_amount));

          this.chartData = {
            datasets: [{
              data: variableDataPoints,
              backgroundColor: ['#D4AF37', '#137ABF', '#4edea3'],
              cutout: '80%',
            }],
          };
        }

        this.cdr.detectChanges(); // Tell Angular to redraw the chart!
      }
    });
  }

  // This plugin draws the text in the middle of the doughnut hole
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
    }
  };
}
