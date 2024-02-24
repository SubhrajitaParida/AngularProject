import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { GetProductComponent } from './get-product/get-product.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotComponent } from './forgot/forgot.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import emailjs from 'emailjs-com';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './CartModel/cart.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginserviceComponent } from './loginservice/loginservice.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DisplayFeedbacksComponent } from './display-feedbacks/display-feedbacks.component';
import { AddressComponent } from './address/address.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataSource } from './UserModel/user.datasource';
import { TipsComponent } from './tips/tips.component';
import { WellnessProductsComponent } from './wellness-products/wellness-products.component';
import { DoyouknowComponent } from './doyouknow/doyouknow.component';
import { MainServiceService } from './main-service.service ';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    ProductComponent,
    ProductDetailsComponent,
    SearchBarComponent,
    AddProductComponent,
    GetProductComponent,
    AdminComponent,
    HomeComponent,
    LoginserviceComponent,
    AboutComponent,
    FooterComponent,
    ForgotComponent,
    VerificationCodeComponent,
    SidenavComponent,
    MainNavComponent,
    CartComponent,
    FeedbackComponent,
    DisplayFeedbacksComponent,
    AddressComponent,
    OrderComponent,
    PaymentComponent,
    RegistrationComponent,
    TipsComponent,
    WellnessProductsComponent,
    DoyouknowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [

    CartService,
    MainServiceService,
    DataSource,
    DataSource
      // provideAnimationsAsync()

  ],
  bootstrap: [AppComponent],
})
export class AppModule { constructor(){
  emailjs.init('KUutJAigOujSteTmn');
}}
