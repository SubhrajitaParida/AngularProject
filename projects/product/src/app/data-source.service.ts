import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Observable, tap } from 'rxjs';
import { PasswordUpdateRequest } from './Model/PasswordUpdateRequest.model';
import { Feedback } from './Model/Feedback.model';
import { Address } from './Model/Address.model';
import { Order } from './Model/Order.model';
import { Cart } from './CartModel/cart.model';

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
 
  getFeedbackDetails(): Observable<Feedback[]> {
    // alert("service")
    return this.http.get<Feedback[]>("http://localhost:8083/medicine/feedback/get/all").pipe(tap(data => {
      // alert("service : "+JSON.stringify(data))
    }));
  }

  getAddressByUserId(userId: string | null): Observable<any[]> {
    // alert("Service " + userId)
    return this.http.get<any[]>(`http://localhost:8083/medicine/address/getByUserId/${userId}`);
     
  }

  getAddressByAddressId(addressId: string | null): Observable<any[]> {
    // alert("Service getAddress " + addressId)
    return this.http.get<any[]>(`http://localhost:8083/medicine/address/get/${addressId}`)
  }

  getUserById(userId: any): Observable<any[]> {
    // alert("Service getUser " + userId)
    return this.http.get<any[]>(`http://localhost:8083/medicine/address/getUser/${userId}`).pipe(tap(data => {
      // alert("service getUser: " + JSON.stringify(data))
    }));
  }

  saveAddress(address: Address): Observable<Address> {
    // alert("Service saveAddress " + address)
    return this.http.post<Address>(`http://localhost:8083/medicine/address/save`, address);
  }

  updateAddress(address: Address): Observable<Address> {
    // alert("Service updateAddress " + JSON.stringify(address))
    return this.http.put<Address>(`http://localhost:8083/medicine/address/update/${address.addressId}`, address);
  }

  saveFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`http://localhost:8083/medicine/feedback/save`, feedback);
  }

  saveOrder(order: Order): Observable<Order> {
    // alert("Service saveOrder " + JSON.stringify(order))
    return this.http.post<Order>(`http://localhost:8083/medicine/order/save`, order);
  }

  validateUser(email: string, password: string): Observable<any> {
    // alert("service email " + email + "password " + password)
    return this.http.get<any>(`http://localhost:8084/medicine/users/validate/${email}/${password}`);
  }

  getCartDetails(cartId: any): Observable<any> {
    // alert("service cartId " + cartId)
    return this.http.get<any>(`http://localhost:8081/medicine/cart/${cartId}`);
  }
  updatePassword(passwordupdate:PasswordUpdateRequest): Observable<any> {
    // alert("service updatePassword "+JSON.stringify(passwordupdate))
    return this.http.put<any>(`http://localhost:8084/medicine/users/updatepassword`,passwordupdate );
  }

  updateCartStatus(cart:Cart):Observable<Cart>{
    alert(JSON.stringify(cart))
    return this.http.put<Cart>(`http://localhost:8081/medicine/cart/updateStatus`,cart );
  }

}
