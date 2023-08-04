import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './Components/chat/chat.component';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';
import { DatetimeFormatPipe } from './Pipes/datetime-format.pipe';
import { FormsModule } from '@angular/forms';



const route:Routes=[{
  path: 'chat/:id', component: ChatComponent,canActivate:[userAuthGGuard]
}];

@NgModule({
  declarations: [
    ChatComponent,
    DatetimeFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route)
  ]
})
export class ChatModule { }
