// import { Component, OnInit } from '@angular/core';

// import { DataSourceService } from '../data-source.service';
// import { Product } from '../Model/product.model';
// import { ProductRepo } from '../Model/product.repo';
// import { CategoryEntity } from '../Model/category.model';
// import { DataSource } from '../Model/product.datasource';
// import { ActivatedRoute, Router } from '@angular/router';
// import { subscribe } from 'diagnostics_channel';

// @Component({
//   selector: 'app-add-product',
//   templateUrl: './add-product.component.html',
//   styleUrls: ['./add-product.component.css']
// })
// export class AddProductComponent implements OnInit{

//   public categories:any[]=[];
  
//   product: Product = new Product(0, '', 0, 0, '',1,'', new CategoryEntity(0, ''));

//   constructor(private route:ActivatedRoute, private productRepo: ProductRepo, private datasource:DataSource,private router:Router) {
//     this.getCategories();
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       const productId = +params['id'];
//       if (productId) {
//         this.getProductDetails(productId);
//       }
//     });
//   }

 
//   InsertProduct() {
//     if (this.product.productId) {
//       this.datasource.updateProduct(this.product).subscribe(
//         (response) => {
//           console.log('Product updated successfully:', response);
//           this.router.navigate(['/admin/GetProduct']);
//         },
//         (error) => {
//           console.error('Error updating product:', error);
//         }
//       );
//     } else {
//       this.datasource.insertProduct(this.product).subscribe(
//         (response) => {
//           console.log('Product inserted successfully:', response);
//           this.router.navigate(['/admin/GetProduct']);
//         },
//         (error) => {
//           console.error('Error inserting product:', error);
//         }
//       );
//     }
  
//     return false; // Prevent default form submission
//   }
  
  

//   getCategories(){
//     this.datasource.getCategories().subscribe(
//       (data) => {
//         this.categories = data;
//       },
//       (error) => {
//         console.error("Data not found");
//       }
//     );
//   }

//   getProductDetails(productId: number): void {
//     this.productRepo.getProductById(productId).subscribe(
//       (product: Product) => {
//         // Assign fetched product details to the product object
//         this.product = product;
//       },
//       (error) => {
//         console.error("Error fetching product:", error);
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Model/product.model';
import { ProductRepo } from '../Model/product.repo';
import { DataSource } from '../Model/product.datasource';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public categories: any[] = [];
  product: Product = new Product(0, '', 0, 0, '', 1, '','Add To Cart', { categoryId: 0, categoryName: '' });

  constructor(
    private route: ActivatedRoute,
    private productRepo: ProductRepo,
    private datasource: DataSource,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
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
    this.productRepo.insertProduct(this.product);
     
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
}

