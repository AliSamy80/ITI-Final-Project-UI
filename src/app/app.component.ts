import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from './Services/home-page.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from './Services/Notifications/notifications.service';
import { NotificationID, Notifications } from './Component/home-page/NotificatioModel/notifications';
import { MeetingService } from './meetin/Services/meeting.service';
import { MeetinModule } from './meetin/meetin.module';
import { Meeting, MeetingID } from './meetin/Models/meeting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'UIProject';
  userName:string = '';
  personalPhoto:any ;
  isShowFooter:boolean=true;
  notifications:Notifications[]=[];
  notificationsId:NotificationID[]=[];
  meetings:Meeting[]=[];
  meetingsID:MeetingID[]=[];
  count:number=0;
meetingCount=0;
  constructor(private meetingServices:MeetingService, private notificationServices:NotificationsService,private router:Router,private services:HomePageService,private sanitizer: DomSanitizer){}
   ngOnInit() {
    this.getNotifications();
this.getMeetings();
    this.services.geUsername().subscribe({
      next:(value)=> {
        this.userName=value.username;
        this.personalPhoto=this.sanitizer.bypassSecurityTrustUrl(value.personalPhoto);
      },
      error(err) {
        console.log(err);
      },
    });  }
registerClick(){
  this.router.navigate(['/user/register'])
}

logout(){
  localStorage.removeItem('token');
   this.router.navigate(['/user/login']);
}



token:string|null = localStorage.getItem('token');



showFooter(){
  this.isShowFooter=true;
}
hideFooter(){
  this.isShowFooter=false;
}

toChat(){
  this.isShowFooter=false;
  this.router.navigate(['chat/chat/'+'#']);
  this.isShowFooter=false
}

showNotification:boolean=false;
toggileNotification(){
  this.showNotification=!this.showNotification;

}

showMeeting:boolean=false;
toggileMeeting(){
  this.showMeeting=!this.showMeeting;
}

 getNotifications(){
console.log("Begin Get Notificaions=====================>>>>>");

this.notificationServices.getNotification().subscribe({
  next: (value) => {
    this.notifications = [];
    this.count = 0;
    value.map((e: any) => {
      const documentData = e.payload.doc.data();
      const documentId = e.payload.doc.id; // Access the document ID

      this.notifications.push(documentData);
      this.notificationsId.push(documentId);

      if (!documentData.starus) {
        this.count++;
      }

      console.log("Notification ===>>> ", this.notifications);
      console.log("Notification Count ===>>> ", this.count);
    });
  }
});

}

getMeetings(){
  console.log("Begin Get Meeting=====================>>>>>");

  this.meetingServices.getAllMettings().subscribe({
    next: (value) => {
      this.meetings = [];
      this.meetingCount = 0;
      value.map((e: any) => {
        const documentData = e.payload.doc.data();
        const documentId = e.payload.doc.id; // Access the document ID

        this.meetings.push(documentData);
        this.meetingsID.push(documentId);

        if (!documentData.stuts) {
          this.meetingCount++;
        }

        console.log("Meeting ===>>> ", this.meetings);
        console.log("Meetings Count ===>>> ", this.meetingCount);
      });
    }
  });

  }


}



