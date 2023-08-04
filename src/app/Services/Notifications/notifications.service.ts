import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Notifications } from 'src/app/Component/home-page/NotificatioModel/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private afs:AngularFirestore) { }

  sendNotification(notification:Notifications){
    this.afs.collection('/user').doc(notification.userId).collection('Notifications').add(notification);
  }

  updateNotification(notificationID:string){
    const updateStatus={starus:true};
    this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Notifications').doc(notificationID).update(updateStatus);
  }

  getNotification(){
    console.log("Token",localStorage.getItem('token'));
   return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Notifications').snapshotChanges();
  }
}
