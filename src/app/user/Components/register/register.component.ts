import { UserService } from '../../Services/user.service';
import { IUser } from '../../Models/iuser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user:IUser={
    FullName:'',
    Email:'',
    Password:'',
    Address:'',
    PhoneNumber:'',
    BirthDate:'',
  }
userForm:FormGroup;
  constructor(private servces:UserService,private router:Router,private toastr: ToastrService){
    this.userForm=new FormGroup({
      FullName:new FormControl('',[Validators.required,Validators.minLength(8)]),
      Email:new FormControl('',[Validators.required,Validators.email]),
      Password:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required]),
      PhoneNumber:new FormControl('',[Validators.required]),
      BirthDate:new FormControl(this.maxDate,[Validators.required])
    });


  }
  ngOnInit(): void {
    this.userForm.valueChanges.subscribe({
      next:(emp)=>{
        this.user=emp;
      }
    });
  }

  registerComponent(){
    this.servces.register(this.user).subscribe({
      next:(user)=>{
        this.toastr.success('مرحبا بك في عائلة سكني تم تسجيل الدخول بنجاح');
        this.router.navigate(['/user/verify']);
      },
      error:(err)=> {
        this.toastr.error('عفوا هذا الايميل مستخدم من قبل ',);
        console.log(err);
      },
    });
  }

   maxDate:any = this.getMinDateForAge(21);
   minDate:any = this.getMinDateForAge(150);
  getMinDateForAge(age: number): string {
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - age, currentDate.getMonth(), currentDate.getDate());

    return minDate.toISOString().substring(0, 10);
  }
}
