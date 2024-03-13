import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../UserModel/user.model";
import { PasswordUpdateRequest } from "../Model/PasswordUpdateRequest.model";

@Injectable({ providedIn: 'root' })
export class DataSource {

  constructor(private http: HttpClient) { }

  private baseUrl="http://localhost:8084/medicine/users";

  saveUser(User: User): Observable<User> {
    console.log("service method");
    return this.http.post<User>(`${this.baseUrl}/save`, User);
  }

  updatePassword(passwordupdate: PasswordUpdateRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updatepassword`, passwordupdate);
  }

  validateUser(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/${email}/${password}`);
  }

  generateOTP(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/generateotp/${email}`);
  }

  verifyOTP(email: string, otp:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verify/${email}/${otp}`);
  }

}