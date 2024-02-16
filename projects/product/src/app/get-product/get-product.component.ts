import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/product.model';
import { ProductRepo } from '../Model/product.repo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent implements OnInit{
public products:Product[]=[];
productId: number=0;
  product: Product | undefined;

constructor(private route: ActivatedRoute, private repo:ProductRepo){

}
ngOnInit(): void {
  this.getAll();
  this.route.params.subscribe(params => {
    this.productId = +params['id'];
    if (this.productId) {
      this.getProductById(this.productId);
    }
  });
}
getAll(){
  this.products=this.repo.getProducts();
  console.log(this.products);
  
}

deleteProduct(ProductId:any){
  this.repo.deleteProduct(ProductId);
}

getProductById(productId: number): void {
  this.repo.getProductById(productId).subscribe(
    (product: Product) => {
      this.product = product;
    },
    (error) => {
      console.error("Error fetching product:", error);
    }
  );
}
}
