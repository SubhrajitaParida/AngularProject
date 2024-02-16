import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { error } from 'console';
import { PasswordUpdateRequest } from '../Model/PasswordUpdateRequest.model';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {

  public passwordUpdate:PasswordUpdateRequest=new PasswordUpdateRequest("","");

  constructor(private form:FormBuilder,private router:Router,private service:DataSourceService){}


  public forgotForm = this.form.group({
    email: this.form.control('', [Validators.required, Validators.email]),
    verificationCode:this.form.control('',[Validators.required]),
    password: this.form.control('', [Validators.required, Validators.minLength(8)])
  })

  updatePassword(){
    this.service.updatePassword(this.passwordUpdate).subscribe((data)=>{
      alert("Password updated successfully");
    },(error)=>{
      alert("Password not updated. Try again")
    }
    )

  }

  resetPassword() {
    console.log(JSON.stringify(this.forgotForm.value));
    if (this.forgotForm.value.email!==null && this.forgotForm.value.email!==undefined && 
      this.forgotForm.value.password !==null && this.forgotForm.value.password!==undefined && 
      this.forgotForm.value.verificationCode!==null && this.forgotForm.value.verificationCode) {
        this.passwordUpdate.email=this.forgotForm.value.email;
        this.passwordUpdate.newPassword=this.forgotForm.value.password;
        if(this.forgotForm.value.verificationCode==="ABCD"){
          alert("Verified successfully.")
          this.updatePassword();
        }
        else{
          alert("Verification code is incorrect. Please enter correct verification code")
        }
    } 
    else {
      alert("Forgot details are invalid. Please enter valid credentials");
    }
  }
  

}
