import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statistics',
  imports: [NgxChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  isLoading: boolean = true;
  view: [number, number] = [1000, 360];

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.updateChartSize();
      window.addEventListener('resize', this.updateChartSize.bind(this));
    }, 500);
  }

  updateChartSize() {
    const parentWidth = document.querySelector('.chart-container')?.clientWidth || 1000;
    this.view = [parentWidth, 360];
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateChartSize.bind(this));
  }

  data = [
    {
      name: 'Income',
      series: [
        { name: 'Jan', value: 5000 },
        { name: 'Feb', value: 6000 },
        { name: 'Mar', value: 5500 },
        { name: 'Apr', value: 7000 },
        { name: 'May', value: 5400 },
        { name: 'June', value: 3200 },
        { name: 'Jul', value: 3000 },
        { name: 'Aug', value: 2800 },
        { name: 'Sep', value: 4500 },
        { name: 'Oct', value: 5000 },
        { name: 'Nov', value: 5200 },
        { name: 'Dec', value: 5100 },
      ]
    },
    {
      name: 'Expenses',
      series: [
        { name: 'Jan', value: 3000 },
        { name: 'Feb', value: 3500 },
        { name: 'Mar', value: 3200 },
        { name: 'Apr', value: 3000 },
        { name: 'May', value: 3400 },
        { name: 'June', value: 3200 },
        { name: 'Jul', value: 2300 },
        { name: 'Aug', value: 5400 },
        { name: 'Sep', value: 3000 },
        { name: 'Oct', value: 2300 },
        { name: 'Nov', value: 3400 },
        { name: 'Dec', value: 4000 },
      ]
    }
  ];
  
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#dc3545']
  };
}