import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../data-source.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
 
  public addresses:any[]=[];
  public cartId:string|null=null;
  public userId:any=0;
  public cart:any=null;
  constructor(private service:DataSourceService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.cartId=this.route.snapshot.paramMap.get("cartId")
    if(this.cartId!=null){
      this.getCartDetails()
    }
    this.getAddress(this.userId);
  }
  
  getAddress(userId:string|null){
    // console.log("Order component userId " +userId)
    this.service.getAddressByUserId(userId).subscribe((data: any[]) => {
      // console.log("Component data "+ JSON.stringify(data))
      this.addresses=data;
      console.log("Component order "+this.addresses)
    }),(error: any)=> {console.log("error occured "+ error)};
    
  }
  
  getCartDetails(){
    // console.log("cartId : "+this.cartId)
    this.service.getCartDetails(this.cartId).subscribe((data: any[]) => {
      // console.log("Component data "+ JSON.stringify(data))
      this.cart=data;
      this.userId=this.cart.userId;
      console.log("Component order "+this.cart)
    }),(error: any)=> {
      console.log("error occured "+ error)
    };
    
  }

}
