import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceService } from '../Service/data-source.service';
import { Product } from '../Model/product.model';
import { CartService } from '../CartModel/cart.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../AuthService.service (1)';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productsId: any;
  public productDetails: any = {};
  public productList: Product[] = [];
  public isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private data: DataSourceService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productsId = params.get('productId');
      this.getProductsById(this.productsId);
    });
  }

  getProductsById(productsId: any): void {
    this.data.getProductsById(productsId).subscribe(
      (data: any) => {
        this.productDetails = data;
        // After fetching product details, fetch composition data
        this.getCompositionForProduct(productsId);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  getCompositionForProduct(productId: any): void {
    this.data.getProductCompositionById(productId).subscribe(
      (compositionData: any[]) => {
        // Assign the received composition data to productDetails
        this.productDetails.composition = compositionData;
      },
      (error) => {
        console.error('Error fetching composition details:', error);
      }
    );
  }

  private showSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 2000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'Close', config);
  }

  addToCart(product: Product): void {
    this.isLoggedIn = this.authService.isLogged();
    if (!this.isLoggedIn) {
      this.showSnackBar("Please Signup to add products to your cart");
      this.router.navigate(['/medicine']);
    } else {
      product.quantityProduct = 1;
      product.status = "Added To Cart";
      this.productList.push(product);
      console.log(this.productList);
      this.cartService.addToCart(this.productList);
    }
  }
}
