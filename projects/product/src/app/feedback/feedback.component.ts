import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { DataSourceService } from '../Service/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Order } from '../Model/Order.model';
import { Address } from '../Model/Address.model';
import { Payment } from '../Model/Payment.model';
import { Feedback } from '../Model/Feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})

export class FeedbackComponent implements OnInit{

  faStar = faStar;

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  public feedbacks:string="";
  public order:Order=new Order(0,"","",new Address(0,"","","",0,0,""),0,new Payment(0,"",0,"",""));
  public feedback:Feedback=new Feedback(0,0,this.order,"",0,"");
  constructor(private fb: FormBuilder, private service:DataSourceService , private route:ActivatedRoute,private snackBar:MatSnackBar,private router:Router) {}

  ngOnInit(): void {
    const userId:any = this.route.snapshot.paramMap.get("userId");
    const orderId:any = this.route.snapshot.paramMap.get("orderId");
    if(userId!==null && userId!==undefined){
      this.feedback.userId = userId; 
    }
    if(orderId!==null && orderId!==undefined){
      this.feedback.order.orderId = orderId; 
    }
  }

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  feedbackForm = this.fb.group({
    feedbacks: ['', [Validators.required , this.minLinesValidator(2)]]
  });

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
  }

  minLinesValidator(minLines: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const lines = control.value ? control.value.split('\n').length : 0;
      return lines >= minLines ? null : { minLines: true };
    };
  }

  addDetails(){
    // console.log("before adding : "+JSON.stringify(this.feedback))
    const feedbackValue = this.feedbackForm.get('feedbacks')?.value;
    if (feedbackValue !== null && feedbackValue !== undefined) {
      // console.log(feedbackValue);
      this.feedback.feedback=feedbackValue;
    }
    if(this.rating!=0){
      this.feedback.ratings=this.rating;
    }
    // console.log("after adding : "+this.feedback)
  }

  saveFeedback(){
    this.addDetails();
    // console.log("before save : " + JSON.stringify(this.feedback))
    if(this.feedback.userId!=0 && this.feedback.feedback!="" && this.feedback.ratings!=0 && this.feedback.order.orderId!=0){
      this.service.saveFeedback(this.feedback).subscribe(
        (data: any) => {
          // console.log(JSON.stringify(data))
          this.showSnackBar("Feedback saved successfully")
          this.router.navigate(['/medicine'])
        },
        (error: any) => {
          this.showSnackBar("Feedback not saved successfully!! Please provide details")
        }
      )
      // console.log("after save : " + JSON.stringify(this.feedback))
    }
    else{
      this.showSnackBar("Feedback not saved successfully!! Please provide details")
    }
    
  }

}
