import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataSourceService } from '../data-source.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css'
})
export class VerificationCodeComponent {

  constructor(private fb: FormBuilder,private service:DataSourceService,private router:Router) { }

  public emailForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email])
  })

  sendEmail() {
    // alert("hello "+  this.emailForm.value.email)
    if(this.emailForm.value.email!==null && this.emailForm.value.email!==undefined && this.emailForm.value.email!==''){
      emailjs.send('service_s45rr0s', 'template_4c9ud4j', {
        to_email: this.emailForm.value.email,
        from_email: 'rajeswaribayapureddymula@gmail.com',
        subject: 'Verification Code'
      }).then((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', response);
        this.router.navigate(['/forgot']);
        // Handle success (e.g., show a success message to the user)
      }, (error) => {
        console.error('Error sending email:', error);
        // Handle error (e.g., show an error message to the user)
      });
    }
    else{
      alert("Enter email for verification code")
    }
  }

}
