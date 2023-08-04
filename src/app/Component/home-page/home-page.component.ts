import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
// import { UnitBuild } from 'src/app/unit-building/Model/unit-build';
// import { UnitBuildService } from 'src/app/Services/UnitBuildingService/unit-build.service';
// import { UnitBycity } from 'src/app/unit-building/Model/unit-bycity';
import { Router } from '@angular/router';
// import { HomePageService } from 'src/app/Services/HomePageService/home-page.service';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';



const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({visibility: 'hidden' }), stagger('200ms', animate('100ms ease-out', style({visibility: 'visible' })))],
      { optional: true }
    ),
    // query(':leave',

    //   animate('10ms', style({ visibility: 'hidden' })),
    //   { optional: true}
    // )
  ])
]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],

  animations: [ listAnimation]
})
export class HomePageComponent implements OnInit ,OnDestroy {

  constructor( private router:Router,private sanitizer: DomSanitizer,private toaster:ToastrService )
  {

  }
  token:string|null = localStorage.getItem('token');


  limitUnit = 0;
limitUnitEnd=2;
// showUnit(){
//   if(this.limitUnitEnd < this.UnitBuildByDate.length)
//   {
//     this.limitUnitEnd+=2;
//     this.limitUnit+=2;
//   }
//   console.log(this.limitUnitEnd);

// }
previousUnit(){
  this.limitUnit-=2;
  this.limitUnitEnd-=2;
  console.log(this.limitUnit);
}



limitcity = 0;
limitcityend=3 ;
// show=true;
// showCity(){
//   if(this.limitcityend < this.UnitBuildByCity.length)
// {
//   // this.show = !this.show;
//   this.limitcityend+=3;
//   this.limitcity+=3;
// }
// }
previousCity(){
    this.limitcity-=3;
    this.limitcityend-=3;
    console.log(this.limitcity);
}

registerClick(){
  this.router.navigate(['/user/register'])
}

//   UnitBuildList : UnitBuild [] =[];

// UnitBuildByCity :UnitBycity[]=[];


// UnitBuildByDate :UnitBuild[]=[];

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public rout = inject(Router);

    title = 'UIProject';
    userName:string = '';
    personalPhoto:any ;

  ngOnInit(): void {
    console.log(this.token);
    // this.services.geUsername().subscribe({
    //   next:(value)=> {
    //     this.userName=value.username;
    //     this.personalPhoto=this.sanitizer.bypassSecurityTrustUrl(value.personalPhoto);
    //     console.log(value);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    // });
    //-------------------


//     this.unotbuildsrv.getAllcat().subscribe
//     ({ next : catogries => {
//         this.UnitBuildList = catogries;
//       },
//       error : err => console.log(err)
//     });

//     this.unotbuildsrv.getbyCity().subscribe
//     ({ next : catogries => {
//       catogries.forEach(element => {
//         if(element.imagepath != null)
//         this.UnitBuildByCity.push(element)})
//         // this.UnitBuildByCity=catogries;
//         // this.allUnitBuildByCity=this.UnitBuildByCity.slice(0,3);

//       },
//       error : err => console.log(err)
//     })
//     this.unotbuildsrv.getbyDate().subscribe
//     ({ next : catogries => {
//         this.UnitBuildByDate=catogries;
//         // this.allUnitBuildByDate=this.UnitBuildByDate.slice(0,2);
//         console.log(this.UnitBuildByDate)
//       },
//       error : err => console.log(err)
//     })

//   }

//   pageTitle = 'سكني';

//    showCities :boolean = false;

//  showUnitBuilding :boolean = false;



// name : string=" ";
// public clear(){
//   this.name="";
// }
  }
  searchClick()
{
  window.scrollTo(0, 0);
}
formData = {
  name: '',
  email: '',
  massage:'',
  phone:'',
};
showErrors = false;
@ViewChild('myForm') myForm!: NgForm;


showMessage=false;

close(){
this.showMessage=false;

}
submitForm() {
  // do something with the form data

  console.log(this.formData);

  // reset the form
  if (this.myForm.valid) {
this.myForm.reset();
    // this.formData = {
    //   name: '',
    //   email: '',
    //   massage:'',
    //   phone:''};
this.toaster.success('تم إرسال طلبك بنجاح سيتم التواصل معك من خلال الشركة');

}
else{
  this.showErrors = true;
}
}
}


