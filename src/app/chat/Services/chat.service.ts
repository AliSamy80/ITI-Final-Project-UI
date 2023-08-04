import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Chat, Users } from '../Models/chat';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient,private afs:AngularFirestore) { }

  addUser(userID:string){
    this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Users').add({'UserID':userID})
     return this.afs.collection('/user').doc(userID).collection('Users').add({'UserID':localStorage.getItem('token')!})
   }

  sendMessage(chat:Chat){
    this.afs.collection('/user').doc(chat.senderID).collection('Chat').doc(chat.recieverID).collection('Messages').add(chat);
   return this.afs.collection('/user').doc(chat.recieverID).collection('Chat').doc(chat.senderID).collection('Messages').add(chat);
     }
  getMessages(buyerID:string){
    return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Chat').doc(buyerID).collection('Messages').snapshotChanges();
  }

  getUsers(){
    return this.afs.collection('/user').doc(localStorage.getItem('token')!).collection('Users').snapshotChanges();
  }


  getUserFromAPI(usersID:string[]){
   return this.http.get<Users[]>("http://localhost:5219/api/Account/getUsers/"+usersID);
  }
}
