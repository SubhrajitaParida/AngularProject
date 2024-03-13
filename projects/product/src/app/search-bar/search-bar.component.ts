import { Component } from '@angular/core';
import { DataSourceService } from '../Service/data-source.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string="";

  constructor(private router: Router) { }

  search(): void {
    if (this.searchTerm) {
      this.router.navigate(['medicine/products'], { queryParams: { q: this.searchTerm } });
    }
  }
}
