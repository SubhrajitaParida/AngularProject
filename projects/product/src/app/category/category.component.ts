import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../Service/data-source.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
 
  public categories2:any[]=[];

  constructor(private datasource:DataSourceService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.datasource.getCategories().subscribe(
      (data)=>{
        this.categories2=data;
      },
      (error)=>{
        console.error("data not found")
      }
    )
  }
}