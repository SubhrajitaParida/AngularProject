import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../Service/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../AuthService.service (1)';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  public addresses: any[] = [];
  public cartId: string | null = null;
  public userId: any = 0;
  public cart: any = null;
  public isLoggedIn:boolean=false;
  constructor(private service: DataSourceService, private route: ActivatedRoute, private authService: AuthService,private snackBar:MatSnackBar,private router:Router) { }
 
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("userId")
    this.isLoggedIn=this.authService.isLogged()
    if(this.isLoggedIn==false){
      this.showSnackBar("Please signup to continue the order process")
      this.router.navigate(['/cart'])
    }
    // alert("userId : "+this.userId)
    this.getCartDetails()
    this.getAddress(this.userId);
  }

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  getAddress(userId: string | null) {
    // console.log("Order component userId " +userId)
    this.service.getAddressByUserId(userId).subscribe((data: any[]) => {
      // console.log("Component data "+ JSON.stringify(data))
      this.addresses = data;
      console.log("Component order " + this.addresses)
    }), (error: any) => { console.log("error occured " + error) };

  }

  getCartDetails() {
    console.log("cartId : " + this.cartId)
    this.service.getCartDetails(this.userId).subscribe((data: any[]) => {
      console.log("Component data " + JSON.stringify(data))
      this.cart = data;
      this.cartId=this.cart.cartId
      this.authService.setCartId(this.cartId);
      // alert("cartId : " + this.cartId)
      // alert(this.userId)
      console.log("Component order " + JSON.stringify(this.cart))
    }), (error: any) => {
      console.log("error occured " + error)
    };

  }

}
