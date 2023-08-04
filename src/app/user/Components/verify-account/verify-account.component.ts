import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IVerifyAccount } from '../../Models/iverify-account';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

verifyUser:IVerifyAccount={
  NID:'',
  NIDPhoto:'',
  PersonalPhoto:''
};

verifyForm:FormGroup;
  constructor(private toaster:ToastrService,private serives:UserService,private router:Router,private sanitizer:DomSanitizer) {
  this.verifyForm=new FormGroup({
  NID:new FormControl('',[Validators.required,Validators.minLength(14),Validators.maxLength(14)]),
  NIDPhoto:new FormControl('',[Validators.required]),
  PersonalPhoto:new FormControl('',[Validators.required]),
});
  }

  ngOnInit(): void {
    this.verifyForm.valueChanges.subscribe(data =>{

      this.NID=data.NID;
      this.verifyUser.NIDPhoto=data.NIDPhoto;
      this.verifyUser.PersonalPhoto=data.PersonalPhoto;
      console.log("================================"+this.NID);
    })
  }

  uploadImages(){
    let formData=new FormData();
    formData.set('NID',this.NID);
    formData.set('NIDPhoto',this.NIDPhoto);
    formData.set('PersonalPhoto',this.PersonalPhoto);

    console.log(localStorage.getItem('token'));
    console.log(formData);
    console.log("=======> NID <======"+this.NID);

    this.serives.verifyAccount(formData).subscribe({
    next:(value)=> {
      this.toaster.info("سيتم مراجعة بياناتك في خلال 48 ساعه","تأكيد الهوية")
      this.router.navigate(['/homePage'])
      console.log(value);

    },
    error(err) {
    console.log(err);
     }
    });
  }

NID:string='';
NIDPhoto:any;
PersonalPhoto:any;

urlPersonal:SafeUrl | undefined;
urlNID:SafeUrl | undefined;

onPersonalSelected(event: any) {
this.PersonalPhoto=event.target.files[0];
this.urlPersonal= this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.PersonalPhoto));
 }

 onNIDSelected(event: any) {
  this.NIDPhoto=event.target.files[0];
  this.urlNID= this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.NIDPhoto));
   }

   removePersonalImage() {
this.urlPersonal=undefined;
   }
   removeNIDImage() {
    this.urlNID=undefined;
       }
notNow(){
  this.router.navigate(['/homePage']);
  this.toaster.warning('لم يتم تأكيد حسابك يرجي تأكيد الحساب لتتمكن من استخدام المواقع بالكامل','تأكيد الهوية')
}
  }

