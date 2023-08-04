import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../Models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseApiUrl: string="http://localhost:5219";

  constructor(private http: HttpClient) { }

  getProfile()
  {
    return this.http.get<Profile>(this.baseApiUrl+ '/api/Profile/'+ localStorage.getItem('token'));
  }

  updateProfile( ProfileUpdate:Profile)
  {
    return this.http.put<Profile>(this.baseApiUrl+ '/api/Profile/'+localStorage.getItem('token'), ProfileUpdate);
  }

  // updateProfileImg( url:string)
  // {
  //   return this.http.put<any>(this.baseApiUrl+ '/api/Profile/img'+localStorage.getItem('token'), url);
  // }

  updateProfileImg(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/api/Profile/img/${localStorage.getItem('token')}`, formData);
  }
}
