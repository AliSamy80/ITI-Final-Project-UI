import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../Models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
 baseUrl: string="http://localhost:5219/api/Offer";
  constructor(private http:HttpClient) { }
  getOffers(){
return this.http.get<Offer[]>(this.baseUrl+"/"+localStorage.getItem('token'));
  }

  getOffer(offerID:number){
    return this.http.get<Offer>(this.baseUrl+"/getOffer/"+offerID);
      }

  deleteOffer(offerID:any){
    return this.http.delete<Offer>(this.baseUrl+"/"+offerID);
  }

  addOffer(offer:Offer){
    console.log("on Offer Added" , offer)
    return this.http.post<Offer>(this.baseUrl,offer);
  }
}
