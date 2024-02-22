import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";



@Injectable({providedIn: 'root'})
export class DataSource {

    constructor(private http:HttpClient) { }
     saveUser(User:User):Observable<User>{
      console.log("service method");
      return this.http.post<User>(`http://localhost:8084/medicine/users/save`,User);
  }
}