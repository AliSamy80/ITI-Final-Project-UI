import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  baseUrl:string="http://localhost:5219/api/Account";
  constructor(private http:HttpClient) {}
geUsername(){
  return this.http.get<any>(this.baseUrl+'/getUsername/'+localStorage.getItem('token'));
}
}
