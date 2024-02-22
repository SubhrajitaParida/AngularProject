import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataSourceService } from '../data-source.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RandomCodeService } from '../RandomCodeService';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css'
})
export class VerificationCodeComponent {

 
  constructor(private fb: FormBuilder,private service:DataSourceService,private router:Router,private snackBar:MatSnackBar,private random:RandomCodeService) { }

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
    alert(this.code)
    if(this.emailForm.value.email!==null && this.emailForm.value.email!==undefined && this.emailForm.value.email!==''){
      emailjs.send('service_bw5okx9', 'template_4c9ud4j', {
        to_email: this.emailForm.value.email,
        from_email: 'rajeswaribayapureddymula@gmail.com',
        subject: 'Verification Code',
        verification_code: this.code
      }).then((response: EmailJSResponseStatus) => {
        this.showSnackBar("Email sent successfully")
        this.router.navigate(['/forgot']);
      }, (error) => {
        // console.error('Error sending email:', error);
        this.showSnackBar("Email not sent. Please try again")
      });
    }
    else{
      this.showSnackBar("Enter email for verification code")
    }
  }

}
