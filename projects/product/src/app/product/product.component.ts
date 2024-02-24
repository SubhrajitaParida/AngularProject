import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { log } from 'console';
import { Product } from '../Model/product.model';
import { CartService } from '../CartModel/cart.service';
import { AuthService } from '../AuthService.service (1)';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  public isLoggedIn:boolean=false;


  constructor(private ref: ActivatedRoute, private dataSource: DataSourceService,
     private cartService:CartService,private authservice:AuthService,
      private snackBar: MatSnackBar, private router:Router ) { }

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
    // this.get();
    this.dataSource.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  addToCart(product:Product){
   
    this.isLoggedIn=this.authservice.isLogged()
    if(this.isLoggedIn==false){
      this.showSnackBar("Please Signup to add products to your cart")
      this.router.navigate(['/medicine'])
    }

   else{
    product.quantityProduct=1;
    product.status="Added To Cart";
    this.productList.push(product);
    console.log(this.productList); 
    this.cartService.addToCart(this.productList); 
   }
     
   }


}
