import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../Service/data-source.service';
import { Feedback } from '../Model/Feedback.model';

@Component({
  selector: 'app-display-feedbacks',
  templateUrl: './display-feedbacks.component.html',
  styleUrl: './display-feedbacks.component.css'
})
export class DisplayFeedbacksComponent implements OnInit{

  public feedbacks:Feedback[]=[];

  constructor(private service:DataSourceService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(){
    // alert("feedbacks component")
    this.service.getFeedbackDetails().subscribe((data: any[]) => {
      // alert("Component data"+JSON.stringify(data))
      this.feedbacks=data;
      // alert("Component feedback"+JSON.stringify(this.feedbacks))
    }),(error: any)=> {console.log("error occured")};
    
  }

}
