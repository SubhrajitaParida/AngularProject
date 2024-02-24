import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  public main = new Subject<number>();
  constructor() { }

  getCartQuantity(quantity:number){
    this.main.next(quantity);
  }
  
}
