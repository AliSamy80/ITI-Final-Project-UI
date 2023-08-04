import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meeting } from '../Models/meeting';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Profile } from 'src/app/user/Models/profile';
import { Observable } from 'rxjs';
import { UnitDetails } from 'src/app/unit/Models/unit-details';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private afs:AngularFirestore,private http:HttpClient) { }
  baseApiUrl: string="http://localhost:5219";

  addMeeting(meeting:Meeting){
    console.log("Begin Services === ",meeting);

    this.afs.collection('/user').doc(meeting.ownerID).collection('Meeting').add(meeting);
    this.afs.collection('/user').doc(meeting.buyerID).collection('Meeting').add(meeting);
  }

  getAllMettings(){
    return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Meeting').snapshotChanges();
  }

  getMettingDeails(meetinID:string){
    return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Meeting').doc(meetinID).snapshotChanges();
  }

  getProfile(userID:string)
  {
    return this.http.get<Profile>(this.baseApiUrl+ '/api/Profile/'+ userID);
  }

  updateStatus(meetingID:string){
    const updateStatus={stuts:true};
    this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Meeting').doc(meetingID).update(updateStatus);
  }

}
