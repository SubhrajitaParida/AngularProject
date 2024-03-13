// import { Component, OnInit } from '@angular/core';
// import { Product } from '../Model/product.model';
// import { ProductRepo } from '../Model/product.repo';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DataSource } from '../Model/product.datasource';

// @Component({
//   selector: 'app-get-product',
//   templateUrl: './get-product.component.html',
//   styleUrl: './get-product.component.css'
// })
// export class GetProductComponent implements OnInit{
// public products:Product[]=[];
// productId: number=0;
//   product: Product | undefined;

// constructor(private route: ActivatedRoute, private repo:ProductRepo,private router:Router,private data:DataSource){

// }
// ngOnInit(): void {
//   this.route.params.subscribe(params => {
//     this.productId = +params['id'];
//     if (this.productId) {
//       this.getProductById(this.productId);
//     }
//   });
//   this.getAll();
// }
// getAll(){
//   this.data.getProductDetails().subscribe(
//     (data)=>{
//     this.products=data;
//     }
//   );
//   console.log(this.products);
  
// }

// deleteProduct(ProductId:any){
//   this.repo.deleteProduct(ProductId);
//   this.getAll();
//   this.router.navigate(['/admin/GetProduct'])
  
// }

// getProductById(productId: number): void {
//   this.repo.getProductById(productId).subscribe(
//     (product: Product) => {
//       this.product = product;
//     },
//     (error) => {
//       console.error("Error fetching product:", error);
//     }
//   );
// }
// }
import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/product.model';
import { DataSource } from '../Service/product.datasource';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {
  public products: Product[] = [];
  productId: number = 0;
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private data: DataSource) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      if (this.productId) {
        this.getProductById(this.productId);
      }
    });
    this.getAll();
  }

  getAll() {
    this.data.getProductDetails().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  deleteProduct(productId: any) {
    this.data.deleteProducts(productId).subscribe(
      () => {
        console.log("Product deleted successfully");
        // Refresh the product list after deletion
        this.getAll();
        this.router.navigate(['/admin/GetProduct']);
      },
      (error) => {
        console.error("Error deleting product:", error);
      }
    );
  }

  getProductById(productId: number): void {
    this.data.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        console.error("Error fetching product:", error);
      }
    );
  }
}
