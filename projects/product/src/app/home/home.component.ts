import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  defaultCategory: string | null = null;

  onCategorySelected(category: any) {
    this.defaultCategory = category; // Assuming category is of string type
  }
}
