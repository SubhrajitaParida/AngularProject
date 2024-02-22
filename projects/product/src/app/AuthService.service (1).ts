import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isLoggedIn:boolean=false;

  isLogged(){
    return this.isLoggedIn;
  }

  getUser(){
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  loginin(user:any) {
    this.isLoggedIn=true
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.isLoggedIn=false
    localStorage.removeItem('userData');
  }
}
