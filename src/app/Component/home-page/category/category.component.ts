import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/unit/Models/icategory';
import { UnitService } from 'src/app/unit/Services/unit.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Categories:ICategory[]=[];
  constructor(private services:UnitService){}
  ngOnInit(): void {
    this.getCategoriesComponent();
  }

  getCategoriesComponent(){
    this.services.getCategory().subscribe({
      next:(value)=> {
        this.Categories=value;
        console.log("Categories===>>>> ",this.Categories);
        this.Categories.forEach(m=>{console.log( m.coverImage)})
      },
    });
  }

}
