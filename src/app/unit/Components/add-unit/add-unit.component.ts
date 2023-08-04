import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Addunit } from '../../Models/addunit';
import { UnitService } from '../../Services/unit.service';
import { ICategory } from '../../Models/icategory';
import { TypePrice } from '../../Models/type-price';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit{
  Unit:Addunit={
    Name: '',
    Description: '',
    Area: 0,
    Address: '',
    CapacityBathRoom: 0,
    City: '',
    Duration: 0,
    CoverImage: '',
    Location: '',
    CapacityRoom: 0,
    Governamnet: '',
    CategoryId: 0,
    Price: 0,
    PriceType: 0,
    UnitConcreteImagesFile: [],
    UnitImagesFile: [],
    FloorNumber: 1,
    MaxPrice: 0,
    MinPrice: 0,
  }
  Category:ICategory[] = [];

unitForm:FormGroup;
  constructor(private servces:UnitService,private formBuider:FormBuilder,private router:Router,private sanitizer:DomSanitizer){
    this.unitForm=new FormGroup({
      CategoryId:new FormControl('',[Validators.required]),
      FloorNumber:new FormControl('1',[Validators.required,Validators.min(1),Validators.max(100)]),
      Name:new FormControl('',[Validators.required]),
      Governamnet:new FormControl('',[Validators.required]),
      City:new FormControl('',[Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),
      Area:new FormControl('',[Validators.required,Validators.min(1)]),
      CapacityRoom:new FormControl('',[Validators.required,Validators.min(1)]),
      CapacityBathRoom:new FormControl('',[Validators.required,Validators.min(1)]),
      Price:new FormControl('',[Validators.required,Validators.min(500)]),
      PriceType:new FormControl('',[Validators.required]),
      MinPrice:new FormControl('500',[Validators.required,Validators.min(500)]),
      MaxPrice:new FormControl('500',[Validators.required,Validators.min(500)]),
      Description:new FormControl('',[Validators.required,Validators.minLength(100)]),
      CoverImage:new FormControl('',[Validators.required]),
      UnitImagesFile:new FormControl('',[Validators.required]),
      UnitConcreteImagesFile:new FormControl('',[Validators.required])
    });
  }
showFloor:boolean = false;
  selectCategory(event:any){
 if(event.target.value==2){this.showFloor=true;}
 else {this.showFloor=false;}
  }
  ngOnInit(): void {

    this.servces.getCategory().subscribe({
      next:(value)=>{
        this.Category=value;
      },
    });
    this.unitForm.valueChanges.subscribe({
      next:(emp)=>{
        this.Unit=emp;
      }
    });

    this.getData();
  }


    jsonData: any[]=[];
    getData() {
      this.servces.getGovernerateData().subscribe({
        next:(value)=>{
          this.jsonData=value;
          console.log(this.jsonData);

        },
      });
    }

    selectedGovernorate: string='';
    cities: any[]=[];

    onGovernorateChange(event:any): void {
      console.log("====SElectedGovernorate==" +event.target.value);
      const selected = this.jsonData.find(item => item.governorate_name_ar === event.target.value);
      console.log("===>>Selected<<====" + selected);
      this.cities = selected ? selected.cities : [];
    }
CoverImageURL:any;
CoverImageFile:any;

UnitImageURL:any[]=[];
UnitImagesFile:any[]=[];
UnitImageFile:any;

UnitImageConractURL:any[]=[];
UnitImagesConractFile:any[]=[];
UnitImageConractFile:any;

    selectCoverImage(event:any){
      this.CoverImageFile=event.target.files[0];
      this.CoverImageURL= this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.CoverImageFile));
    }

    selectUnitImages(event:any){
      let len=(event.target.files).length;

      for (let index = 0; index < len; index++) {
        this.UnitImageFile=event.target.files[index];
        this.UnitImagesFile.push(this.UnitImageFile);
        this.Unit.UnitImagesFile=this.UnitImagesFile;
        console.log(this.Unit.UnitImagesFile);
        this.UnitImageURL.push(this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.UnitImageFile)));
      }
    }

    selectUnitImagesContracs(event:any){
      let len=(event.target.files).length;

      for (let index = 0; index < len; index++) {
        this.UnitImageConractFile=event.target.files[index];
        this.UnitImagesConractFile.push(this.UnitImageConractFile);
        this.Unit.UnitConcreteImagesFile=this.UnitImagesConractFile;
        console.log(this.Unit.UnitConcreteImagesFile);
        this.UnitImageConractURL.push(this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.UnitImageConractFile)));
      }
    }

    removeUnitImages(i:number){

        this.UnitImagesFile.splice(i,1);
        this.Unit.UnitImagesFile=this.UnitImagesFile;
        console.log(this.Unit.UnitImagesFile);
        this.UnitImageURL.splice(i,1);
    }


    removeUnitImagesContracs(i:number){

        this.UnitImagesConractFile.splice(i,1);
        this.Unit.UnitConcreteImagesFile=this.UnitImagesConractFile;
        console.log(this.Unit.UnitConcreteImagesFile);
        this.UnitImageConractURL.splice(i,1);

    }
    // unitCoverImage?:string;
    unitImages?:string;
    unitImagesCont?:string;
    AddUnitComponent(){

      this.Unit.CoverImage=this.CoverImageFile;
      this.Unit.UnitImagesFile=this.UnitImagesFile;
      this.Unit.UnitConcreteImagesFile=this.UnitImagesConractFile;

      let formData=new FormData();

      formData.set('Name',this.Unit.Name);
      const floor=this.Unit.FloorNumber!.toString();
      formData.set('FloorNumber',floor);
      const catID=this.Unit.CategoryId.toString();
      formData.set('CategoryId',catID);
      formData.set('Governamnet',this.Unit.Governamnet);
      formData.set('City',this.Unit.City);
      formData.set('Address',this.Unit.Address);
      formData.set('Location',this.Unit.Location);
      const area=this.Unit.Area.toString();
      formData.set('Area',area);
      const room=this.Unit.CapacityRoom.toString();
      formData.set('CapacityRoom',room);
      const bathRoom=this.Unit.CapacityBathRoom.toString();
      formData.set('CapacityBathRoom',bathRoom);
      const price=this.Unit.Price.toString();
      formData.set('Price',price);
      const priceType=this.Unit.PriceType.toString();
      formData.set('PriceType',priceType);
      const minPrice=this.Unit.MinPrice!.toString();
      formData.set('MinPrice',minPrice);
      const maxPrice=this.Unit.MaxPrice!.toString();
      formData.set('MaxPrice',maxPrice);
      formData.set('Description',this.Unit.Description);
      formData.set('CoverImage',this.Unit.CoverImage);
      for (let i = 0; i < this.Unit.UnitImagesFile.length; i++) {
        formData.append('UnitImagesFile', this.Unit.UnitImagesFile[i], this.Unit.UnitImagesFile[i].name);
      }
      for (let i = 0; i < this.Unit.UnitConcreteImagesFile.length; i++) {
        formData.append('UnitConcreteImagesFile', this.Unit.UnitConcreteImagesFile[i], this.Unit.UnitConcreteImagesFile[i].name);}




      this.servces.AddUnit(formData).subscribe({
        next:(value)=>{
this.navigateToChild(value.id);
console.log(value);

        },
        error(err) {
          console.log(err);

        },
      });
    }

      navigateToChild(id:any) {
        const data = 'Hello from parent!';
        this.router.navigate(['unit/selectDuration', { data: id }]);
      }

      PriceType: any[] = Object.keys(TypePrice).filter((key) => !isNaN(Number(key)));
      isShowPrice = false;
      toggilePrice(event:any){
        console.log(event.target.value);

        if(event.target.value==1){this.isShowPrice=true;}
         else {this.isShowPrice=false;}
      }

  }





