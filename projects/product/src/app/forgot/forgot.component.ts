import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { error } from 'console';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RandomCodeService } from '../RandomCodeService';
import { PasswordUpdateRequest } from '../Model/PasswordUpdateRequest.model';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {

  public passwordUpdate:PasswordUpdateRequest=new PasswordUpdateRequest("","");

  constructor(private form:FormBuilder,private router:Router,private service:DataSourceService,
    private snackBar:MatSnackBar,private random:RandomCodeService){}

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar']; // Add your custom class for styling
    config.duration = 3000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  public forgotForm = this.form.group({
    email: this.form.control('', [Validators.required, Validators.email]),
    verificationCode:this.form.control('',[Validators.required]),
    password: this.form.control('', [Validators.required, Validators.minLength(8)])
  })

  updatePassword(){
    this.service.updatePassword(this.passwordUpdate).subscribe((data)=>{
      this.showSnackBar("Password updated successfully");
      this.router.navigate(['/login'])
    },(error)=>{
      this.showSnackBar("Password not updated. Try again")
    }
    )

  }

  resetPassword() {
    // console.log(JSON.stringify(this.forgotForm.value));
    alert("hello")
    if (this.forgotForm.value.email!==null && this.forgotForm.value.email!==undefined && 
      this.forgotForm.value.password !==null && this.forgotForm.value.password!==undefined && 
      this.forgotForm.value.verificationCode!==null && this.forgotForm.value.verificationCode) {
        this.passwordUpdate.email=this.forgotForm.value.email;
        this.passwordUpdate.newPassword=this.forgotForm.value.password;
        const code = this.random.getVerificationCode();
        if(this.forgotForm.value.verificationCode==code){
          // alert("Verified successfully.")
          this.updatePassword();
        }
        else{
          this.showSnackBar("Verification code is incorrect. Please enter correct verification code")
        }
    } 
    else {
      this.showSnackBar("Forgot details are invalid. Please enter valid credentials");
    }
  }
  

}
