import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceService } from '../Service/data-source.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import e from 'express';
import { Address } from '../Model/Address.model';
import { Order } from '../Model/Order.model';
import { Payment } from '../Model/Payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  constructor(private paymentBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private service: DataSourceService, private snackBar: MatSnackBar) { }

  public mode: string | null | undefined = "";
  public amount: any = 0;
  public userId: any = 0;
  public cartId:any=null;
  public cart: any = null;
  public address: Address = new Address(0, "", "", "", 0, 0, "");
  public payment: Payment = new Payment(0, "", this.amount, "", "");
  public order: Order = new Order(0, "", "", this.address, 0, this.payment)

  public status: string = "";
  public statusArray: string[] = ["success", "failure", "success", "success"]
  public wrongMonth:boolean=false;
  public wrongexpirydate:boolean=false;
  public discountApplied:boolean=false;
  public afterDiscount:number=0;

  public paymentForm = this.paymentBuilder.group({
    amount: this.paymentBuilder.control(this.amount, [Validators.required]),
    afterDiscount:this.paymentBuilder.control(''),
    paymentMode: this.paymentBuilder.control("", [Validators.required]),
    cardNumber: this.paymentBuilder.control(''),
    expiryDate: this.paymentBuilder.control(''),
    cvv: this.paymentBuilder.control(''),
    upiId: this.paymentBuilder.control(''),
    promoCode: this.paymentBuilder.control(''),
  })

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("addressId");
    this.userId = this.route.snapshot.paramMap.get("userId")
    if (this.userId != null) {
      this.getCartDetails();
    }
    if (id != null) {
      const number = parseInt(id, 10);
      this.address.addressId = number;
    }

  }

  hideFields() {
    const mode = this.paymentForm.get('paymentMode')?.value;
    this.mode = mode;
    if (mode === 'upi') {
      this.payment.paymentMode = mode;
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiryDate')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
      this.paymentForm.get('upiId')?.setValidators([Validators.required]);
    } else if (mode === 'creditCard' || mode === 'debitCard') {
      this.payment.paymentMode = mode;
      this.paymentForm.get('upiId')?.clearValidators();
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required]);
      this.paymentForm.get('expiryDate')?.setValidators([Validators.required]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required]);
    }

    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiryDate')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
    this.paymentForm.get('upiId')?.updateValueAndValidity();
  }

  validateExpiryDate() {
    const expiryDateValue = this.paymentForm.value.expiryDate;
    if (expiryDateValue) {
      const [month, year] = expiryDateValue.split('/');
      const today = new Date();
      const inputMonth = parseInt(month, 10);
      const inputYear = parseInt(year, 10);
  
      this.wrongMonth = (inputMonth >= 1 && inputMonth <= 12);
      this.wrongexpirydate = !(inputYear < today.getFullYear()) || (inputYear === today.getFullYear() && inputMonth <= (today.getMonth() + 1));
    }
  }
  
  


  addDetails() {
    // alert("before adding : " + JSON.stringify(this.order))
    this.payment.status = "success"
    this.order.payment = this.payment
    if (this.cartId != 0) {
      this.order.cartId = this.cartId;
    }
    // alert("after adding : " + JSON.stringify(this.order))
  }

  processPayment() {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.statusArray.length);
      this.status = this.statusArray[randomIndex];
      // console.log(this.status);

      if (this.status === "success") {
        this.showSnackBar("Payment is success")
        this.addDetails()
        if (this.order.cartId != 0 && this.order.address.addressId != 0 && this.order.payment.paymentMode != "" && this.order.payment.status != "") {
          // alert("before save : " + JSON.stringify(this.order))
          this.service.saveOrder(this.order).subscribe(
            (data: any) => {
              // alert(JSON.stringify(data))
              this.showSnackBar("Order placed successfully")
              this.service.updateCartStatus(this.cart).subscribe((data)=>{
                this.router.navigate([`/cart`]);
              });
              
            },
            (error: any) => {
              this.showSnackBar("Something went wrong!!.Please try again")
              // alert("Error occurred : "+ JSON.stringify(error));
            }
          )
        }
        else {
          this.showSnackBar("Order not placed successfully!!.Please try again")
        }
      } else {
        this.showSnackBar("Payment failed. Please try again.");
      }
    }, this.getRandomDelay());
  }

  getRandomDelay(): number {
    return Math.floor(Math.random() * (4000 - 3000 + 1)) + 3000;
  }


  getCartDetails() {
    // alert("payment cartId : " + this.userId)
    this.service.getCartDetails(this.userId).subscribe((data: any[]) => {
      console.log("Component data " + JSON.stringify(data))
      this.cart = data;
      this.amount = this.cart.amount;
      // alert(this.amount)
      this.paymentForm.get('amount')?.setValue(this.amount.toFixed(2));
      this.cartId = this.cart.cartId;
    }), (error: any) => {
      console.log("error occured " + error)
    };

  }

  applyPromoCode() {
    // alert("hello")
    if (this.paymentForm.get('promoCode') !== null) {
      const promoCodeValue = this.paymentForm.get('promoCode')?.value;
  
      if (promoCodeValue === 'PROMO10') {
        this.discountApplied=true;
        // Apply a discount of 10% for promo code 'PROMO10'
        let currentAmount: any = this.paymentForm.get('amount')?.value;
        this.afterDiscount = currentAmount - (currentAmount * 0.2);
        this.paymentForm.get('afterDiscount')?.setValue(this.afterDiscount.toFixed(2));
      }
      else{
        this.discountApplied=false;
        this.showSnackBar("Invalid promocode")
      }
    }
  }
}
