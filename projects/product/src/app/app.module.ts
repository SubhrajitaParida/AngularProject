import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
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
import { LoginserviceComponent } from './loginservice/loginservice/loginservice.component';
import { ForgotComponent } from './forgot/forgot.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import emailjs from 'emailjs-com';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './CartModel/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
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
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [

    CartService

  ],
  bootstrap: [AppComponent],
})
export class AppModule { constructor(){
  emailjs.init('KUutJAigOujSteTmn');
}}
