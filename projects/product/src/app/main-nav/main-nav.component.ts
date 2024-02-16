import { Component } from '@angular/core';
import { faHome, faUser, faInfoCircle, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  faHome = faHome;
  faUser = faUser;
  faInfoCircle = faInfoCircle;
  faUserPlus = faUserPlus;
  faShoppingCart = faShoppingCart;

}
