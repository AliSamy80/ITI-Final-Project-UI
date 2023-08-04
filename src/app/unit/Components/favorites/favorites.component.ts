import { Component } from '@angular/core';
import { UnitCard } from '../../Models/unit-card';
import { Favorites } from '../../Models/favorites';
import { UnitService } from '../../Services/unit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 10;
  pageElement=0;
  buttonArray:number[]=[] ;

  unitCard:UnitCard[]=[];
  favorites:Favorites[]=[];



  constructor(private services:UnitService,private router:Router){}
  ngOnInit(): void {
  this.getFavorites();
  this.getAllFavorites();
this.pageElement=this.totalCount/this.pageSize;
this.buttonArray= Array(this.pageElement).fill(0).map((_, index) => index + 1);

  }

  togleFavorites(id:number){
if(this.checkFavorite(id)){
  this.favorites = this.favorites.filter(item => item.unitID !== id);

  this.unitCard = this.unitCard.filter(item => item.id !== id);
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

    },
  });
}

// getunitsComponent(){
//   this.services.getAllUnits(this.pageNumber,this.pageSize).subscribe(response => {
//     this.unitCard = response.data;
//     this.totalCount = response.totalCount;
//     console.log("UnitCard", this.unitCard);
//     console.log("TotalCount",this.totalCount);
//     console.log("Count",this.pageElement);

//     this.pageElement=Math.floor(this.totalCount/this.pageSize)+(this.totalCount%this.pageSize>0?1:0);

// this.buttonArray= Array(this.pageElement).fill(0).map((_, index) => index + 1);
// console.log("ButtonToArray",this.buttonArray);
//   });
// }
 getAllFavorites(){
    this.services.getAllFavorites(this.pageNumber,this.pageSize).subscribe(response => {
      this.unitCard = response.data;
      this.totalCount = response.totalCount;
      console.log("UnitCard", this.unitCard);
      console.log("TotalCount",this.totalCount);
      console.log("Count",this.pageElement);

      this.pageElement=Math.floor(this.totalCount/this.pageSize)+(this.totalCount%this.pageSize>0?1:0);

  this.buttonArray= Array(this.pageElement).fill(0).map((_, index) => index + 1);
  });
}

checkFavorite(id:any):boolean{
  for (let index = 0; index < this.favorites.length; index++) {
    if(this.favorites[index].unitID==id){
          return true
    }
  }
  return false;
}

previousPage() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.getAllFavorites();
  }
}

nextPage() {
  if (this.pageNumber * this.pageSize < this.totalCount) {
    this.pageNumber++;
    this.getAllFavorites();
  }
}

setPage(pnumber:number){
  this.pageNumber=pnumber;
  this.getAllFavorites();
}

}

