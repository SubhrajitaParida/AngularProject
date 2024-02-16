import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { DataSource } from "./product.datasource";
import { error } from "console";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductRepo{

  public product:Product[]=[];

  constructor(private dataSource:DataSource) {
    this.getAllProduct();
  }
  getProductById(productId: number): Observable<Product> {
    return this.dataSource.getProductById(productId);
  }
  insertProduct(products:Product){
    this.dataSource.insertProduct(products).subscribe(
        (data)=>{
            console.log(data);
        },
        (error)=>{
            console.log("error inserted data not found");
        }
    )
  }

  getAllProduct(){
    this.dataSource.getProductDetails().subscribe((data)=>this.product=data )
  }

  getProducts():Product[]{
   return this.product;
  }

 
  deleteProduct(productId:number){
    console.log("deleting product with ",productId);
    this.dataSource.deleteProducts(productId).subscribe(
      ()=>{
        console.log("Product deleted succesfully");
      }
    )
  }
}