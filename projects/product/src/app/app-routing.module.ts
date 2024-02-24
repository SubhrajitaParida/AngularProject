import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { GetProductComponent } from './get-product/get-product.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { ForgotComponent } from './forgot/forgot.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { CartComponent } from './cart/cart.component';
import { LoginserviceComponent } from './loginservice/loginservice.component';
import { OrderComponent } from './order/order.component';
import { DisplayFeedbacksComponent } from './display-feedbacks/display-feedbacks.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentComponent } from './payment/payment.component';
import { AddressComponent } from './address/address.component';
import { RegistrationComponent } from './registration/registration.component';
import { TipsComponent } from './tips/tips.component';
import { DoyouknowComponent } from './doyouknow/doyouknow.component';
import { WellnessProductsComponent } from './wellness-products/wellness-products.component';


const routes: Routes = [

  {
    path: 'admin', component: AdminComponent,
    children:[
      {
        path: 'AddProduct', component: AddProductComponent
      },
      {
        path: 'GetProduct', component: GetProductComponent
      },
      { path:
         'edit-product/:id', component: AddProductComponent 
      }
    ]
  },
  
  
  {
   path:'login', component:LoginserviceComponent
  },
  {
    path:'about', component:AboutComponent
   },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'verification', component: VerificationCodeComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path:"order/:userId", component:OrderComponent
  },
  {
    path:"allFeedbacks", component:DisplayFeedbacksComponent
  },
  {
    path:"feedback/:userId/:orderId", component:FeedbackComponent
  },
  {
    path:"payment/:addressId/:userId", component:PaymentComponent
  },
  {
    path:"addAddress/:userId" , component:AddressComponent
  },
  {
    path:"editAddress/:addressId" , component:AddressComponent
  },
  {
    path:"tips" , component:TipsComponent
  },
  {
    path:"doYouKnow" , component:DoyouknowComponent
  },
  {
    path:"wellness" , component:WellnessProductsComponent
  },
  {
    path: 'medicine', component: NavbarComponent,
    children: [
      {
        path: 'categories/:cate', component: ProductComponent
      },
      {
        path: '', redirectTo: 'categories/all', pathMatch: 'full' 
      },
      {
        path: 'details/:productId', component: ProductDetailsComponent 
      },
      {
        path: 'products', component: ProductComponent,
      },
      {
        path: 'search', component: SearchBarComponent
      }
    ]
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full' // Handle invalid routes
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
