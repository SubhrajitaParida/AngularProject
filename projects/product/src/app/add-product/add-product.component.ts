

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Model/product.model';
import { ProductRepo } from '../Model/product.repo';
import { DataSource } from '../Service/product.datasource';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public categories: any[] = [];
  public compositions:any[]=[];
  product: Product = new Product(0, '', 0,0 , '', 1, '','Add To Cart', { categoryId: 0, categoryName: '' } ,[]);
  public selectedCompositionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productRepo: ProductRepo,
    private datasource: DataSource,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getComposition();
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.getProductDetails(productId);
      }
    });
  }

  InsertProduct(): void {
    if (this.product.productId) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  
  addProduct(): void {
    const existingProduct = this.productRepo.getProducts().find(prod => prod.name === this.product.name);
    if (existingProduct) {
      this.showSnackBar('Product with this name already exists. Please choose a different name.');
      return; // Exit the function to prevent adding duplicate product
    }
    
    // If the product name is unique, proceed with adding the product
    this.productRepo.insertProduct(this.product);
    this.router.navigate(['/admin/GetProduct']);
  }
  

  updateProduct(): void {
    this.datasource.updateProduct(this.product).subscribe(
      () => {
        console.log('Product updated successfully');
        this.router.navigate(['/admin/GetProduct']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  getComposition():void{
    this.datasource.getComposition().subscribe(
      (data)=>{
        this.compositions=data;
      },
      (error)=>{
        console.error("Composition details not found");
      }
    )
  }


  getCategories(): void {
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
        this.product = product;
      },
      (error) => {
        console.error("Error fetching product:", error);
      }
    );
  }

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar']; // Add your custom class for styling
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackbar.open(message, 'close', config);
  }
}

