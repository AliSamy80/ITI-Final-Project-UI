import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isUserLoggedSubject: BehaviorSubject<boolean>;
  constructor() {
     this.isUserLoggedSubject=new BehaviorSubject<boolean>(this.UserState);
  }
  get UserState():boolean{
    return (localStorage.getItem('token'))?true:false;
  }

  getUserState():Observable<boolean>{
    return this.isUserLoggedSubject.asObservable();
  }

}
