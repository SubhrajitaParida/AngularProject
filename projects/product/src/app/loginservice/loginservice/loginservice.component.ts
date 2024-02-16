import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from '../../data-source.service';

@Component({
  selector: 'app-loginservice',
  templateUrl: './loginservice.component.html',
  styleUrls: ['./loginservice.component.css'] // Change styleUrl to styleUrls
})
export class LoginserviceComponent{


  constructor(private fb: FormBuilder,private service:DataSourceService,private router:Router) { }

  public loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)])
  })

  loginData() {
    console.log(JSON.stringify(this.loginForm.value));
    if (this.loginForm.value.email!==null && this.loginForm.value.email!==undefined && 
      this.loginForm.value.password !==null && this.loginForm.value.password!==undefined ) {
      // alert(this.loginForm.value)
      this.service.validateUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((data: any) => {
        // alert(JSON.stringify(data))
        // alert("Login successFully")
        this.router.navigate(['/medicine']);
      },
      (error: any) => {
        // alert("Error occurred : " + JSON.stringify(error));
        alert("Login failed. Please enter valid credentials")
      })
    } 
    else {
      alert("Login credentails is invalid. Please enter valid credentials");
    }
  }

}
