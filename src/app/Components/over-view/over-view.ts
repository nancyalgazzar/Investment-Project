import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Plugin  } from 'chart.js';
@Component({
  standalone: true,
  selector: 'app-over-view',
  imports: [BaseChartDirective],

  templateUrl: './over-view.html',
  styleUrl: './over-view.css',
})
export class OverView {
  chartData = {
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['rgba(202, 189, 41, 0.96)', 'rgb(19, 122, 191)'],
        cutout: '80%',
      },
    ],
  };
  chartOptions = {
    responsive: true,
  };
centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    afterDraw(chart) {
      const { ctx, chartArea: { top, width, height } } = chart;

      ctx.save();

      // ✅ main text
      ctx.font = '1em Arial';
      ctx.fillStyle = 'grey';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Profile', width / 2, top + height / 2 - 10);

      // ✅ sub text below
      ctx.font = ' bold 2em Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('30/70', width / 2, top + height / 2 + 20);

      ctx.restore();
    }
  };
}
