import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuPrice } from 'src/app/unit/Models/menu-price';
import { UpdateDuration } from 'src/app/unit/Models/update-duration';
import { UnitService } from 'src/app/unit/Services/unit.service';

@Component({
  selector: 'app-select-duration',
  templateUrl: './select-duration.component.html',
  styleUrls: ['./select-duration.component.css']
})
export class SelectDurationComponent implements OnInit {
  childData: any;
  menuPrice:MenuPrice[]=[];
  paymentHandler:any=null;
  updateDuration:UpdateDuration={
    id:0,
    duration:0,
    unitType:0
  }

  constructor(private toaster:ToastrService,private route:ActivatedRoute,private services:UnitService,private router:Router){
    this.route.paramMap.subscribe(params => {
      this.childData = params.get('data');
      console.log('Received data:', this.childData);
  });
}
  ngOnInit(): void {
    this.invokeStrip();
  this.services.getMenuPrice().subscribe({
  next:(value)=>{
    this.menuPrice=value;
    console.log(this.menuPrice);
  }
});
  }

  makePayment(i:any){
    this.updateDuration.id=this.childData;
    this.updateDuration.duration=this.menuPrice[i].numberOfDays;
    this.updateDuration.unitType=this.menuPrice[i].unittype;
    const paymentHandler=(<any>window).StripeCheckout.configure({
key:'pk_test_51NQqY6BHX9IMV6cJr9UySZzahQLxCnL9aEVVyTYNdMXDWUDlyOSaFRVLVu5mPvICI233D0GcYl3pnmJxQ1eFvYWG0020l3pvu2',
locale:'auto',
token:(stripeoken:any)=>{
  console.log(stripeoken.card);
this.toaster.success('تمت عملية الدفع بنجاح')
  this.setDurationComponent();
}
    });
    paymentHandler.open({
      name:'رفع وحدة سكنية علي الموقع',
      description:" لمدة "+this.menuPrice[i].numberOfDays+" أيام ",
      amount:this.menuPrice[i].price*100
    });
  }

  invokeStrip(){
    if(!window.document.getElementById('stripe-script')){
      const script=window.document.createElement('script');
      script.id='stripe-script';
      script.type='text/javascript';
      script.src="https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }

  public setDurationComponent(){
    this.services.setDuration(this.updateDuration).subscribe({
      next:(value)=>{
        console.log(value);
this.toaster.info('بإنتظار مراجعة البيانات')
        this.router.navigate(['homepage']);
      }
    });
  }

  // animal: string="";
  // name: string="";
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     data: {name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe((result: string) => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
}




// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
