import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Observable, tap } from 'rxjs';
import { PasswordUpdateRequest } from './Model/PasswordUpdateRequest.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http:HttpClient) { }
  


  getCategories():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8081/medicine/categoryController/getAll`);
  }


  getProductByCategoryName(categoryName:any):Observable<any[]>{
    // alert("Service  "+categoryName)
    //alert(`http://localhost:8081/medicine/productController/searchProductByCategoryName/${categoryName}`)
    return this.http.get<any[]>(`http://localhost:8081/medicine/productController/searchProductByCategoryName/${categoryName}`);
    //pipe(tap(data => alert("service products "+JSON.stringify(data))))
    
    
  }

  getProductsById(productId:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8081/medicine/productController/getById/${productId}`);
  }

  getSimilarproductsByName(name:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8081/medicine/productController/searchSimilarProducts/${name}`);
  }

  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8081/medicine/productController/getAll`);
  }
  validateUser(email: string, password: string): Observable<any> {
    alert("service email " + email + "password " + password)
    return this.http.get<any>(`http://localhost:8084/medicine/users/validate/${email}/${password}`);
  }
  updatePassword(passwordupdate:PasswordUpdateRequest): Observable<any> {
    alert("service updatePassword "+JSON.stringify(passwordupdate))
    return this.http.put<any>(`http://localhost:8084/medicine/users/updatepassword,passwordupdate`,passwordupdate );
  }
}
