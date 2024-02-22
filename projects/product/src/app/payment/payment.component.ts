import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceService } from '../data-source.service';
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
  public amount: number = 100;
  public cartId: any = 0;
  public cart: any = null;
  public address: Address = new Address(0, "", "", "", 0, 0, "");
  public payment: Payment = new Payment(0, "", this.amount, "", "");
  public order: Order = new Order(0, "", "", this.address, 0, this.payment)

  public status: string = "";
  public statusArray: string[] = ["success", "failure", "success", "success"]

  public paymentForm = this.paymentBuilder.group({
    amount: this.paymentBuilder.control(this.amount, [Validators.required]),
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
    this.cartId = this.route.snapshot.paramMap.get("cartId")
    if (this.cartId != null) {
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
    const today = new Date();
    if (this.paymentForm.value.expiryDate !== null && this.paymentForm.value.expiryDate !== undefined) {
      const expiryParts = this.paymentForm.value.expiryDate.split('/');
      const expiryMonth = parseInt(expiryParts[0], 10);
      const expiryYear = parseInt(expiryParts[1], 10);
      if (expiryMonth < 1 || expiryMonth > 12) {
        this.showSnackBar('Invalid expiry month. Please enter a month between 1 and 12.');
        return;
      }

      if (expiryYear < today.getFullYear() || (expiryYear === today.getFullYear() && expiryMonth <= (today.getMonth() + 1))) {
        this.showSnackBar('Invalid expiry date. Please enter a future expiry date.');
        return;
      }
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
              this.showSnackBar("Order places successfully")
              this.router.navigate([`/feedback/1/${data.orderId}`]);
            },
            (error: any) => {
              this.showSnackBar("Order not placed successfully!!.Please try again")
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
    // alert("cartId : " + this.cartId)
    this.service.getCartDetails(this.cartId).subscribe((data: any[]) => {
      console.log("Component data " + JSON.stringify(data))
      this.cart = data;
      this.amount = this.cart.amount;
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
        // Apply a discount of 10% for promo code 'PROMO10'
        let currentAmount: any = this.paymentForm.get('amount')?.value;
        currentAmount = currentAmount - (currentAmount * 0.2);
        this.paymentForm.get('amount')?.setValue(currentAmount.toFixed(2));
      }
      else{
        this.showSnackBar("Invalid promocode")
      }
    }
  }
}
