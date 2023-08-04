import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl:string="http://localhost:5219/api/Account";

private isBehaviorSubject:BehaviorSubject<boolean>;

  constructor(private httpClient:HttpClient) {
    this.isBehaviorSubject=new BehaviorSubject<boolean>(this.UserState);
   }

  register(user:any){
    return this.httpClient.post<any>(this.baseUrl,user).pipe(map(response=>{
      const token=response.id;
      if(token){
        localStorage.setItem('token', token); // Store the token in local storage
                return true;
              } else {
                return false;
              }
          }));
  }

  login(user:any){
   return  this.httpClient.post<any>(this.baseUrl+'/login',user).pipe(
    map(response=>{
const token=response.id;
if(token){
  localStorage.setItem('token', token); // Store the token in local storage
          return true;
        } else {
          return false;
        }
    })
   );
  }

  verifyAccount(user:any){
    return this.httpClient.post<any>(this.baseUrl+'/verify/'+localStorage.getItem('token'),user);
  }

    get UserState():boolean{
    return (localStorage.getItem("token"))?true:false;
   }

   getUserState():Observable<boolean>
   {
    return this.isBehaviorSubject.asObservable();
   }

   logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('token');
    return !!authToken; // Returns true if the token exists, indicating that the user is authenticated
  }

}
