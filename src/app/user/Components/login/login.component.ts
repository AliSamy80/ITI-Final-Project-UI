import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { ILogin } from '../../Models/ilogin';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user:ILogin={
    Email:'',
    Password:'',
  }
loginForm:FormGroup;
  constructor(private servces:UserService,private router:Router){
    localStorage.removeItem('token')
    this.loginForm=new FormGroup({
      Email:new FormControl('',[Validators.required,Validators.email]),
      Password:new FormControl('',[Validators.required]),
    });
  }
  ngOnInit(): void {
    localStorage.removeItem('Nav');
    this.loginForm.valueChanges.subscribe({
      next:(emp)=>{
        this.user=emp;
      }
    });
  }



  loginComponent(){
    this.servces.login(this.user).subscribe(success => {
      if (success) {
        this.router.navigate(['/homePage']);
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }});
  }
}
