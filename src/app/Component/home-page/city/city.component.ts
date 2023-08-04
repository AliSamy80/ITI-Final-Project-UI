import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/unit/Models/unit';
import { UnitService } from 'src/app/unit/Services/unit.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{
  city:City[]=[];
  totalCount: number = 0;
  pageNumber: number = 1;
  pageSize: number = 3;
  pageElement=0;
  buttonArray:number[]=[] ;


  constructor(private services:UnitService){}
ngOnInit(): void {
  this.getCitiesComponent();
}

getCitiesComponent(){
this.services.getCities(this.pageNumber,this.pageSize).subscribe({
  next:(response)=>{
    this.city = response.data;
    this.totalCount = response.totalCount;
    console.log("TotalCount City=======>>> ",this.totalCount);

    this.pageElement=Math.floor(this.totalCount/this.pageSize)+(this.totalCount%this.pageSize>0?1:0);
    console.log("DIVISION===>>" , Math.floor(this.totalCount/this.pageSize));
    console.log("pAGEsIZE===>>" , (this.totalCount%this.pageSize>0?1:0));

    console.log("Count cITY====>>> ",this.pageElement);
this.buttonArray= Array(this.pageElement).fill(0).map((_, index) => index + 1);
console.log("ButtonToArray cITY ====>>>",this.buttonArray);
  }
});
}




previousPage() {
  if (this.pageNumber > 1) {
    this.pageNumber--;
    this.getCitiesComponent();
  }
}

nextPage() {
  if (this.pageNumber * this.pageSize < this.totalCount) {
    this.pageNumber++;
    this.getCitiesComponent();
  }
}

setPage(pnumber:number){
  this.pageNumber=pnumber;
  this.getCitiesComponent();
}

}
