import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Chart, ChartDataSets } from "chart.js";
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // labels=[
  //   {value:0, name:'Infraestructura'},
  //   {value:1, name:'Drenajes'},
  //   {value:2, name:'Carreteras'},
  //   {value:3, name:'Electricidad'},
  //   {value:4, name:'Otros'}
  // ]

  @ViewChild("barCanvas") barCanvas: ElementRef;
  private barChart: Chart;
  private reports: Report[];
  private countC=0
  private countD=0
  private countI=0
  private countE=0
  private countO=0
  //chartData=null;

  constructor(
    private authService: AuthentificationService,
    private _reportDataService: ReportService
  ) { }

  // getReportValues(){
  //   this._reportDataService.getReports().subscribe(res => {
  //     this.chartData = res;
  //     console.log(this.chartData);
  //     return this.chartData
  //   });
  // }


  ngOnInit() {
    this._reportDataService.reportsGraphics().subscribe(response => {
      this.reports = response
      this.reports.forEach(element => {
        element.labels.forEach(element => {
          if (element.label === 'Carreteras') {
            this.countC += +1
          }
          else if (element.label === 'Elctricidad') {
            this.countE += +1
          } else if (element.label === 'Otros') {
            this.countO += +1
          } else if (element.label === 'Drenajes') {
            this.countD += +1
          } else if (element.label === 'Infraestructura') {
            this.countI += +1
          }
        });
      });
      console.log(this.countC, this.countD, this.countE, this.countI, this.countO)
      this.createChart(this.countC,this.countI,this.countD,this.countE,this.countO)
    })
    
  }


    //create chart
    
  createChart(countC,countI,countD,countE,countO) {
    //console.log(this.countC)
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Carreteras", "Infraestructura", "Drenajes", "Electricidad", "Otros"],
        datasets: [
          {
            label: "# of Votes",
            data: [countC,countI,countD,countE,countO],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    //this.barChart.data= this.reportsByLabel()
    //this.barChart.update();
    // this.reportsByLabel()
  }

  cerrarSesion() {
    this.authService.logOut()
  }

}
