import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataSourceService } from '../Service/data-source.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RandomCodeService } from '../RandomCodeService';
import { DataSource } from '../Service/user.datasource';


@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css'
})
export class VerificationCodeComponent {

 
  constructor(private fb: FormBuilder,
    private service:DataSource,
    private router:Router,
    private snackBar:MatSnackBar,
    private random:RandomCodeService) { }

  public code:string=this.random.generateVerificationCode();

  public emailForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email])
  })

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  sendEmail() {
 
    if(this.emailForm.value.email!==null && this.emailForm.value.email!==undefined && this.emailForm.value.email!==''){
      this.service.generateOTP(this.emailForm.value.email).subscribe(data=>{
        this.router.navigate(['/forgot']);
      })
    }
    else{
      this.showSnackBar("Enter email for verification code")
    }
  }

}