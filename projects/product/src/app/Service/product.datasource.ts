import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../Model/product.model";
import { Observable } from "rxjs";
import { CategoryComponent } from "../category/category.component";
import { Category } from "../Model/category.model";
import { Composition } from "../Model/composition.model";

@Injectable({providedIn: 'root'})
export class DataSource{
    constructor(private http:HttpClient) { }

    private baseUrl="http://localhost:8081/medicine/products";
    private categoryUrl="http://localhost:8081/medicine/categories";
    private compositionUrl="http://localhost:8081/medicine/compositions";

    insertProduct(Product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/insertproduct`,Product);
    }

    getProductDetails():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/getall`);
    }
    
    deleteProducts(productId:number){
        return this.http.delete(`${this.baseUrl}/delete/${productId}`);
        }
    
        getProductById(productId: number): Observable<Product> {
            return this.http.get<Product>(`${this.baseUrl}/getbyid/${productId}`);
          }

          getCategories(): Observable<Category[]> {
            return this.http.get<Category[]>(`${this.categoryUrl}/getallcategories`);
          }

          updateProduct(product: Product): Observable<any> {
            const url = `${this.baseUrl}/update/${product.productId}`;
            return this.http.put(url, product);
          }

          getComposition():Observable<Composition[]>{
            return this.http.get<Composition[]>(`${this.compositionUrl}/getallcategories`);
          }
}