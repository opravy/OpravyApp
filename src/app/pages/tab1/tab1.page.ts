import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Chart, ChartDataSets } from "chart.js";
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';
import { RecycleReport } from "src/app/models/recycle.model";
import { RecycleReportService } from 'src/app/services/recycle-report.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private barChart: Chart;
  private doughnutChart: Chart;
  private reports: Report[];
  private recycleReports:RecycleReport[];
  private countC=0
  private countD=0
  private countI=0
  private countE=0
  private countO=0
  private countA=0
  private countB=0
  private countCA=0
  private countEl=0
  private countM=0

  constructor(
    private authService: AuthentificationService,
    private _reportDataService: ReportService,
    private _reportRecycleService:RecycleReportService
  ) { }

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
      this.createChart(this.countC,this.countI,this.countD,this.countE,this.countO)
    })

    this._reportRecycleService.getRecycleReports().subscribe(response=>{
      this.recycleReports=response
      this.recycleReports.forEach(element => {
          if (element.material === 'Aceite') {
            this.countA += +1
          }
          else if (element.material === 'Baterías') {
            this.countB += +1
          } else if (element.material === 'Cartón') {
            this.countCA += +1
          } else if (element.material === 'Electrónicos') {
            this.countEl += +1
          } else if (element.material === 'Metales') {
            this.countM += +1
          }   
      });
      console.log(this.countA,this.countB,this.countCA,this.countEl,this.countM)
      this.createChartRecycle(this.countA,this.countB,this.countCA,this.countEl,this.countM)
    })
  }


    //create chart
  createChart(countC,countI,countD,countE,countO) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Carreteras", "Infraestructura", "Drenajes", "Electricidad", "Otros"],
        datasets: [
          {
            label:"Carreteras",
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
  }

  createChartRecycle(countA,countB,countCA,countEl,countM){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Aceite", "Baterías", "Cartón", "Electrónicos", "Metales"],
        datasets: [
          {
            label: "# of Votes",
            data: [countA,countB, countCA, countEl, countM],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB"]
          }
        ]
      }
    });
  }

  cerrarSesion() {
    this.authService.logOut()
  }

}
