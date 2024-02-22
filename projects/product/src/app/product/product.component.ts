import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { log } from 'console';
import { Product } from '../Model/product.model';
import { CartService } from '../CartModel/cart.service';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {



public categoryName: string | null = "";
  public products: any[] = [];
  searchTerm: string | null = '';
  public productList:Product[]=[];
  
addedToCartProducts: any[] = [];


  constructor(private ref: ActivatedRoute, private dataSource: DataSourceService, private cartService:CartService) { }

  ngOnInit(): void {
    this.ref.paramMap.subscribe(params => {
      this.categoryName = params.get('cate') || null;
      if (this.categoryName === 'all') {
        this.getAllProducts();
      } else {
        this.send(this.categoryName);
      }
    });
    this.ref.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || null;
      if (this.searchTerm) {
        this.searchProductsByName(this.searchTerm);
      }
    });
  }
  public amount?:number;

  searchProductsByName(name: string) {
    this.dataSource.getSimilarproductsByName(name).subscribe(data => {
      this.products = data;
    });
  }

  send(categoryName: any) {
    this.dataSource.getProductByCategoryName(categoryName).subscribe(data => this.products = data);
  }

  getAllProducts() {
    this.get();
    this.dataSource.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }
  addToCart(product:Product){
    product.quantityProduct=1;
    this.addedToCartProducts.push(product);
    this.productList.push(product);
    console.log(this.productList); 
    this.cartService.addToCart(this.productList);  
   }

   isAddedToCart(product: any): boolean {
    // Check if the product is in the addedToCartProducts array
    return this.addedToCartProducts.includes(product);
  }

}
