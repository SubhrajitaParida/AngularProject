import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "./cart.model";

@Injectable({providedIn: 'root'})
export class DataSource {


constructor(private http:HttpClient) { }
    
saveCartDetails(cart:Cart):Observable<Cart>{
   return this.http.post<Cart>(`http://localhost:8081/medicine/cart`,cart)
 }

 getCartDetailsBasedOnId(userId:number):Observable<Cart>{
  return this.http.get<Cart>(`http://localhost:8081/medicine/cart/${userId}`)
}

deleteBasedOnId(cartId:number, userId:number):Observable<Cart>{
  return this.http.delete<Cart>(`http://localhost:8081/medicine/cart/delete/${cartId}/${userId}`)
}

updateProductDetails(cart:Cart,productId:number):Observable<Cart>{
  return this.http.put<Cart>(`http://localhost:8081/medicine/cart/update/${productId}`,cart);
}

}