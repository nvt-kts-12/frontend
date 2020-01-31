import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/shared/services/reports/report.service';
import { EventService } from 'src/app/shared/services/event/event.service';
import {Chart} from 'chart.js'
import { map } from 'rxjs/operators';
import { Event } from '@angular/router';
import { EventRep } from 'src/app/shared/model/EventRep.model';
import { LocationRep } from 'src/app/shared/model/LocationRep.model';
import { EventDayRep } from 'src/app/shared/model/EventDayRep.model';
import { User, CommonStoreModule, AuthService } from 'src/app/shared/store';
import { element } from 'protractor';
import { MatSelect } from '@angular/material';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  @ViewChild('selectEvent') selectEvent : MatSelect; 
  @ViewChild('selectShowBy') selectShowBy : MatSelect; 
  @ViewChild('selectLocation') selectLocation : MatSelect;
  
  chart : Chart
  
  events = []
  eventDays =[]
  locations =[]

 
  event : EventRep
  location : LocationRep
  eventDay : EventDayRep
  
  constructor(private reportService : ReportService,private eventService : EventService) {
  }
   
  ngOnInit() {
   this.getAllEvents();
   this.getAllLocations()
  }

   getAllEvents(){
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res
   });
  }

  getAllLocations(){
    this.reportService.getAllLocations().subscribe(res => {
      this.locations = res
   });
  }

  eventReport(id){
    this.reportService.getEventReport(id).subscribe(res =>{
    this.event = res
    this.eventDaysReport(id)
    });
  }
 
   eventDaysReport(id){
    this.reportService.getEventDaysReport(id).subscribe(res=>{
      this.eventDays = res
      this.eventDay = res[0]
      
      let data=[]
      let labels=[]
      
      this.eventDays.forEach(element => {
        data.push(element.totalIncome)
        labels.push(element.eventDayDTO.date)
      });
    
    });
  }

  locationReport(id){
    this.reportService.getLocationReport(id).subscribe(res=>{
      this.location = res
      console.log(res)
      let data=[]
      let labels=[]
      labels.push("ENTERTAINMENT")
      labels.push("CULTURAL")
      labels.push("SPORT")
      
      data.push(res.incomeByCategory.ENTERTAINMENT,res.incomeByCategory.CULTURAL,res.incomeByCategory.SPORT)
    
      if(this.chart!=null){
        this.chart.destroy();
      }
      this.drawChart(data,labels)   
    });
  }
  
  showStatistics(category){
    if(this.event!=null){
      let data=[]
      let labels =[]
      this.eventDays.forEach(element => {
        if(category==1){
          data.push(element.numOfTickets)
        }else if(category==2){
          data.push(element.numOfReservations)
         }
         else {
          data.push(element.totalIncome)
        }
        labels.push(element.eventDayDTO.date)
      });
      if(this.chart!=null){
        this.chart.destroy();
      }
    this.drawChart(data,labels)      
    }
  }

  changeSelection($event){
    this.event=null
    this.location=null;
    
    if(this.chart){
      this.chart.destroy()
    }
    
    this.selectEvent.value=0
    this.selectShowBy.value=0
    this.selectLocation.value=0
  }

  resetShowBy($event){
    this.selectShowBy.value = 0
  }
 
  drawChart(data,labels){
    this.chart = new Chart('canvas',{
      type : 'bar',
      data : {
        labels : labels,
        datasets : [
          {
            data: data,
            borderColor : "#FF0000",
            backgroundColor: "#D3F619",
            fill : "false"
          }
        ]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
          display: false,
       }
    }
    })
  }
}
