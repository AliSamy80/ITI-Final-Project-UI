import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Favorites } from 'src/app/unit/Models/favorites';
import { ICategory, ICategoryWithBuilding } from 'src/app/unit/Models/icategory';
import { UnitCard } from 'src/app/unit/Models/unit-card';
import { UnitService } from 'src/app/unit/Services/unit.service';

@Component({
  selector: 'app-all-units-category',
  templateUrl: './all-units-category.component.html',
  styleUrls: ['./all-units-category.component.css']
})
export class AllUnitsCategoryComponent implements OnInit {
  pCard:number=1;
  itemsPerPageCard:number=4;
  totalItemsCard:any;
  favorites:Favorites[]=[];

  constructor(private service:UnitService ,private router : Router , private route :ActivatedRoute, ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

      this.getAllUnitsCategories(id);

this.getFavorites();

  }
  UnitBuildByCategory?:ICategoryWithBuilding;

  getAllUnitsCategories(id :number)
  {
    console.log(id);
    this.service.getAllUnitsByCategory(id).subscribe({
      next:(value)=> {
        this.UnitBuildByCategory=value;
        this.totalItemsCard=this.UnitBuildByCategory;
        console.log("Categories===>>>> ",this.UnitBuildByCategory);
      },
    });
  }

  togleFavorites(id:number){
    if(this.checkFavorite(id)){
      this.favorites = this.favorites.filter(item => item.unitID !== id);
      this.service.removeFavorites(id).subscribe();
    }
    else{
      let favorite:Favorites ={
        unitID: id
      };
      this.favorites.push(favorite);
      this.service.addFavorites(id).subscribe();
    }
    }

    getFavorites(){
      this.service.getFavorites().subscribe({
        next:(value)=> {
          this.favorites=value;
          console.log("Favorites==>> ",this.favorites);

        },
      });
    }

    checkFavorite(id:any):boolean{
      for (let index = 0; index < this.favorites.length; index++) {
        if(this.favorites[index].unitID==id){
              console.log("Favorites====> True ==");
              return true
        }
      }
      console.log("Favorites====> False ==");
      return false;
    }
}
