import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favorites } from 'src/app/unit/Models/favorites';
import { UnitCard } from 'src/app/unit/Models/unit-card';
import { UnitService } from 'src/app/unit/Services/unit.service';




@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.css']
})

export class UnitCardComponent implements OnInit{

  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 4;
  pageElement=0;
  buttonArray:number[]=[] ;

  unitCard:UnitCard[]=[];
  favorites:Favorites[]=[];



  constructor(private services:UnitService,private router:Router){}
  ngOnInit(): void {
  this.getunitsComponent();
  this.getFavorites();
this.pageElement=this.totalCount/this.pageSize;
this.buttonArray= Array(this.pageElement).fill(0).map((_, index) => index + 1);
console.log("ButtonToArray",this.buttonArray);

  }

  getunitsComponent(){
    this.services.getAllUnits(this.pageNumber,this.pageSize).subscribe(response => {
      this.unitCard = response.data;
      this.totalCount = response.totalCount;
      console.log("UnitCard", this.unitCard);
      console.log("TotalCount",this.totalCount);
      console.log("Count",this.pageElement);

      this.pageElement=Math.floor(this.totalCount/this.pageSize)+(this.totalCount%this.pageSize>0?1:0);

this.buttonArray= Array(this.pageElement).fill(0).map((_, index) => index + 1);
console.log("ButtonToArray",this.buttonArray);
    });
  }

  togleFavorites(id:number){
if(this.checkFavorite(id)){
  this.favorites = this.favorites.filter(item => item.unitID !== id);
  this.services.removeFavorites(id).subscribe();
}
else{
  let favorite:Favorites ={
    unitID: id
  };
  this.favorites.push(favorite);
  this.services.addFavorites(id).subscribe();
}
}

getFavorites(){
  this.services.getFavorites().subscribe({
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

previousPage() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.getunitsComponent();
  }
}

nextPage() {
  if (this.pageNumber * this.pageSize < this.totalCount) {
    this.pageNumber++;
    this.getunitsComponent();
  }
}

setPage(pnumber:number){
  this.pageNumber=pnumber;
  this.getunitsComponent();
}

}
