import { Component, OnInit } from '@angular/core';

import { DataSourceService } from '../data-source.service';
import { Product } from '../Model/product.model';
import { ProductRepo } from '../Model/product.repo';
import { CategoryEntity } from '../Model/category.model';
import { DataSource } from '../Model/product.datasource';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  public categories:any[]=[];
  
  product: Product = new Product(0, '', 0, 0, '',1,'', new CategoryEntity(0, ''));

  constructor(private route:ActivatedRoute, private productRepo: ProductRepo, private datasource:DataSource) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.getProductDetails(productId);
      }
    });
  }

  InsertProduct(product: any) {
    this.productRepo.insertProduct(this.product); 
  }

  getCategories(){
    this.datasource.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error("Data not found");
      }
    );
  }

  getProductDetails(productId: number): void {
    this.productRepo.getProductById(productId).subscribe(
      (product: Product) => {
        // Assign fetched product details to the product object
        this.product = product;
      },
      (error) => {
        console.error("Error fetching product:", error);
      }
    );
  }
}
