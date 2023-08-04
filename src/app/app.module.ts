import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { UnitCardComponent } from './Component/home-page/unit-card/unit-card.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './Component/home-page/category/category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CityComponent } from './Component/home-page/city/city.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './Component/home-page/search/search.component';


import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';



import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor, NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { ToastrModule } from 'ngx-toastr';
import { DatetimeFormatPipe } from './Pipes/datetime-format.pipe';






@NgModule({
  exports:[UnitCardComponent],
  declarations: [
    AppComponent,
    HomePageComponent,
    UnitCardComponent,
    CategoryComponent,
    CityComponent,
    SearchComponent,
    DatetimeFormatPipe,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CommonModule,
    ToastrModule.forRoot({
        timeOut: 10000,
        positionClass: 'toast-top-full-width',
        preventDuplicates: true,
      }),
     // ToastrModule added
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
