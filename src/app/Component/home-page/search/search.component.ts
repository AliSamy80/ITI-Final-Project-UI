import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TypePrice } from 'src/app/unit/Models/type-price';

import { UnitType } from 'src/app/unit/Models/unit-type';
import { UnitService } from 'src/app/unit/Services/unit.service';
import { map, startWith } from 'rxjs/operators';


import { ICategory } from 'src/app/unit/Models/icategory';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit

{

  constructor(private services:UnitService,private router:Router){}

  city:string="";
  filteredOptions?: Observable<string[] |null>;
  cityselectedOption?:string;
  cityonlyy?:string;

  ngOnInit(): void
   {
    this.services.getCategory().subscribe({
      next:(value)=>{
        this.Category=value;
      },
    });

    this.filteredOptions = this.cityControl.valueChanges.pipe(
      map(value=> value!= null ? this._filter(value) : null ));

      this.getData();
      this.displayFn();
    }

onGovernorateChange(event:any): void
 {
      console.log("====SElectedGovernorate==" +event.target.value);
      const selected = this.jsonData.find(item => item.governorate_name_ar === event.target.value);
    }

      jsonData: any[]=[];
      getData() {
        this.services.getGovernerateData().subscribe({
          next:(value)=>{
            this.jsonData=value;
            console.log(this.jsonData);


          },
        });
      }

  cityControl= new FormControl<string|null>(null, Validators.required);


  private _filter(value: string): string[]
  {
    const filterValue = value;
    return this.jsonData.filter(option => option.governorate_name_ar.includes(filterValue));
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.cityselectedOption = event.option.value;
    this.cityonlyy=this.cityselectedOption;
    console.log(this.cityselectedOption);

  }

  selectFormControl = new FormControl('', Validators.required);




  UnitPRICEselected?:number;
  UnitPRICEselectedOption:any;

  priceControl = new FormControl<TypePrice|null>(null, Validators.required);

  PriceTypes = [
    {value: TypePrice.Fixed, label: 'ثابت'},
    {value: TypePrice.Dynamic, label: 'متغير'},
  ];

  UnitTypeselected?:number;
  UnitTypeselectedOption:any;

  unitControl = new FormControl<ICategory|null>(null, Validators.required);

  // UnitTypes = [
  //   {value: UnitType.Sale, label: 'Sale'},
  //   {value: UnitType.Rent, label: 'Rent'},
  // ];
  Category:ICategory[] = [];


  UnitAreaselected?:number;
  UnitAreaselectedOption?:any;

  areaControl = new FormControl<number|null>(null, Validators.required);
  area= [
    {value: 80, label: "م60 :80م"},
    {value: 100, label: "م80 :100م"},
    {value: 120, label: "م100 :120م"},
    {value: 150, label: "م120 :150م"},
    {value: 200, label: "م150 :200م"},
    {value: 300, label: "اكثر من 200م"},

  ];
  UnitCityselected?:number;
  UnitCityselectedOption?:any;





  displayFn() {
    // this.UnitTypeselectedOption = this.UnitTypes.find(animal => animal.value === this.UnitTypeselected)?.value;

    this.UnitTypeselectedOption = this.Category.find(animal => animal.id === this.UnitTypeselected)?.id;
    this.UnitPRICEselectedOption = this.PriceTypes.find(animal => animal.value === this.UnitPRICEselected)?.value;
    this.UnitAreaselectedOption = this.area.find(animal => animal.value === this.UnitAreaselected)?.value;

    console.log(this.UnitTypeselectedOption);
    console.log(this.UnitTypeselectedOption+"mm");

    console.log(this.UnitPRICEselectedOption);
    console.log(this.UnitAreaselectedOption);

  }

}
