import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Feedback } from '../Model/Feedback.model';
import { Address } from '../Model/Address.model';
import { Order } from '../Model/Order.model';
import { Cart } from '../CartModel/cart.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http:HttpClient) { }
  
  private baseUrl="http://localhost:8081/medicine";
  private baseUrlOrder="http://localhost:8083/medicine";

  getProductByCategoryName(categoryName:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/products/searchproductbycategoryname/${categoryName}`);  
  }

  getProductsById(productId:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/products/getbyid/${productId}`);
  }

  getProductCompositionById(productId:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/products/getcompositionsbyproductid/${productId}`);
  }

  getSimilarproductsByName(name:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/products/searchsimilarproducts/${name}`);
  }
  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/products/getall`);
  }
 
  getFeedbackDetails(): Observable<Feedback[]> {

    return this.http.get<Feedback[]>(`${this.baseUrlOrder}/feedback/get/all)`);
  }
  getAddressByUserId(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlOrder}/address/getbyuserid/${userId}`);
     
  }

  getAddressByAddressId(addressId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlOrder}/address/get/${addressId}`)
  }

  getUserById(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlOrder}/address/getUser/${userId})`);
  }

  saveAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrlOrder}/address/save`, address);
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.baseUrlOrder}/address/update/${address.addressId}`, address);
  }

  saveFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrlOrder}/feedback/save`, feedback);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrlOrder}/order/save`, order);
  }

  getCartDetails(cartId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/${cartId}`);
  }
 
  updateCartStatus(cart:Cart):Observable<Cart>{
    return this.http.put<Cart>(`${this.baseUrl}/cart/updateStatus`,cart );
  }


  getCategories():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/categories/getallcategories`);
  }

}