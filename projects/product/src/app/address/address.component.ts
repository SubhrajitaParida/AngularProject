import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Address } from '../Model/Address.model';
import { AuthService } from '../AuthService.service (1)';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit{

  constructor(private addressBuilder: FormBuilder, private route:ActivatedRoute, private service:DataSourceService, 
    private router: Router,private snackBar:MatSnackBar) { }

  public addressId:string|null="";
  public addressDetails:any=null;
  public isEditMode: boolean = false;
  public address:Address=new Address(0,"","","",0,0,"");
  public userId:any=0;

  public addressForm = this.addressBuilder.group({
    streetName: this.addressBuilder.control("", [Validators.required]),
    city: this.addressBuilder.control("", [Validators.required]),
    state:this.addressBuilder.control("", [Validators.required]),
    pinCode: this.addressBuilder.control("", [Validators.required , Validators.maxLength(6) , Validators.pattern(/^\d{6}$/)])
  })

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  ngOnInit(): void {
    this.addressId = this.route.snapshot.paramMap.get("addressId");
    this.userId = this.route.snapshot.paramMap.get("userId");
    // alert(this.userId)
    this.isEditMode = !!this.addressId; 
    // alert(this.isEditMode);
    if(this.isEditMode){
      this.getAddress(this.addressId);
    }

  }

  validAddress(){
    // console.log("before validations : " + JSON.stringify(this.address))
    if(this.addressId!==null){
      const id:number = parseInt(this.addressId,10);
      this.address.addressId=id;
    }
    // alert(this.userId)
    if(this.userId!==null && this.userId!=0){
      const id:number = parseInt(this.userId,10);
      this.address.userId=id;
    }
    const formValue = this.addressForm.value;
    if (formValue.streetName !== null && formValue.streetName !== undefined) {
      this.address.streetName = formValue.streetName;
    }
    if (formValue.city !== null && formValue.city !== undefined) {
      this.address.city = formValue.city;
    }
    if (formValue.state !== null && formValue.state !== undefined) {
      this.address.state = formValue.state;
    }
    if (formValue.pinCode !== null && formValue.pinCode !== undefined) {
      const pinCode = parseInt(formValue.pinCode,10)
      this.address.pinCode = pinCode;
    }
    // console.log("after validations : " + JSON.stringify(this.address))
  }

  saveAddress(){
    this.validAddress();
    console.log("before save : " + JSON.stringify(this.address))
    if(this.address.userId!=0 && this.address.streetName!="" && this.address.city!="" && this.address.pinCode!=0 && this.address.state!=""){
      this.service.saveAddress(this.address).subscribe(
        (data: any) => {
          // alert(JSON.stringify(data))
          this.showSnackBar("Address saved successfully")
          this.router.navigate([`/order/${this.address.userId}`]);
        },
        (error: any) => {
          console.log("Error occurred: "+ JSON.stringify(error));
          this.showSnackBar("Address not saved successfully!!.Please try again")
        }
      )
      
    }
    else{
      console.log("Address not saved successfully!!.Please try again")
    }
    
  }

  updateAddress(){
    this.validAddress();
   console.log("before update : " + JSON.stringify(this.address))
    if(this.address.addressId!=0 && this.address.userId!=0 && this.address.streetName!="" && this.address.city!="" && this.address.pinCode!=0 && this.address.state!=""){
      this.service.updateAddress(this.address).subscribe(
        (data: any) => {
          this.addressForm.patchValue(this.addressDetails);
          // console.log("after update : " + JSON.stringify(this.address))
          // alert(JSON.stringify(data))
          this.showSnackBar("Address saved successfully")
          this.router.navigate([`/order/${this.address.userId}`]);
        },
        (error: any) => {
          console.log("Error occurred: "+ JSON.stringify(error));
          this.showSnackBar("Address not updated successfully!!.Please try again")
        }
      )
      
    }
    else{
      this.showSnackBar("Address not updated successfully!!.Please try again")
    }
    
  }
  

  getAddress(userId: string | null): void {
    if (userId) {
      this.service.getAddressByAddressId(userId).subscribe(
        (data: any) => {
          this.addressDetails = data;
          this.address.userId=this.addressDetails.userId;
          // alert("getAddress  user id "+this.address.userId)
          this.addressForm.patchValue(this.addressDetails);
        },
        (error: any) => {
          console.error("Error occurred:", error);
        }
      );
    }
  }

}
