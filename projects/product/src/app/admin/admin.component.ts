import { Component } from '@angular/core';

import { faHome, faUser, faInfoCircle, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  faHome = faHome;
  faUser = faUser;
  faInfoCircle = faInfoCircle;
  faUserPlus = faUserPlus;
  faShoppingCart = faShoppingCart;
}
