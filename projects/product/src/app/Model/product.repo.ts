import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { DataSource } from "../Service/product.datasource";
import { error } from "console";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ProductRepo{

  public product:Product[]=[];

  constructor(private dataSource:DataSource, private router:Router) {
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
      (data)=>{
          this.router.navigate(['/admin/GetProduct'])
          console.log(data)
        console.log("Product deleted succesfully");
      }
    )
  }
}