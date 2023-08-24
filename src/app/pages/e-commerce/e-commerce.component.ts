import { Component } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ECommerceService } from './services/e-commerce.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent { data: any;
  options: any;
  themeSubscription: any;
chart=[]
stat;
  constructor(private theme: NbThemeService,private dashservice:ECommerceService) {
    this.dashservice.getstat().subscribe(
      (res)=>{
        this.stat = res.value
      }
    )
   
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    this.dashservice.getChart().subscribe(
          (res)=>{
            this.chart=Object.values(res.value);
            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;
      
            this.data = {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
              datasets: [{
                data: this.chart,
                label: 'الحجز / شهر',
                backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
                borderColor: colors.primary,
              }
              ],
            };
      
            this.options = {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: true,
                      color: chartjs.axisLineColor,
                    },
                    ticks: {
                      fontColor: chartjs.textColor,
                    },
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: true,
                      color: chartjs.axisLineColor,
                    },
                    ticks: {
                      fontColor: chartjs.textColor,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontColor: chartjs.textColor,
                },
              },
            };
          }
        )
      
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
