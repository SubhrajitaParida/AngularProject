import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable } from "rxjs";
import { CategoryComponent } from "../category/category.component";
import { CategoryEntity } from "./category.model";



@Injectable({providedIn: 'root'})
export class DataSource{
    constructor(private http:HttpClient) { }

    insertProduct(Product:Product):Observable<Product>{
        // alert("service-"+JSON.stringify(Product));
    return this.http.post<Product>(`http://localhost:8081/medicine/productController`,Product);
    }

    getProductDetails():Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8081/medicine/productController/getAll`);
    }
    
    deleteProducts(productId:number){
        return this.http.delete(`http://localhost:8081/medicine/productController/delete/${productId}`);
        }
    
        getProductById(productId: number): Observable<Product> {
            return this.http.get<Product>(`http://localhost:8081/medicine/productController/getById/${productId}`);
          }

          getCategories(): Observable<CategoryEntity[]> {
            return this.http.get<CategoryEntity[]>(`http://localhost:8081/medicine/categoryController/getAll`);
          }
}