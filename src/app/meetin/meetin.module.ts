import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingDetailsComponent } from './Components/meeting-details/meeting-details.component';
import { MeetingPipe } from './Pipes/meeting.pipe';
import { RouterModule, Routes } from '@angular/router';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';


const route:Routes=[{
  path: 'meeting/:id', component: MeetingDetailsComponent,canActivate:[userAuthGGuard]
}];

@NgModule({
  declarations: [
    MeetingDetailsComponent,
    MeetingPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class MeetinModule { }
