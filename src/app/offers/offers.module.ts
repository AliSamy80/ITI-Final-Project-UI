import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';
import { OffersComponent } from './Components/offers/offers.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DateformatePipe } from './Pipes/dateformate.pipe';

const routes:Routes=[
  {path:'offers/:id',component:OffersComponent,canActivate:[userAuthGGuard]}
]

@NgModule({
  declarations: [
    OffersComponent,
    DateformatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }
