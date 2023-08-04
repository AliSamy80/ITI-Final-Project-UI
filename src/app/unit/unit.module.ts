import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUnitComponent } from './Components/add-unit/add-unit.component';
import { RouterModule, Routes } from '@angular/router';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { SelectDurationComponent } from './Components/add-unit/select-duration/select-duration.component';
import { UnitDetailsComponent } from './Components/unit-details/unit-details.component';
import { UnitBuildingComponent } from './Components/unit-building/unit-building.component';
import { AllUnitsCategoryComponent } from '../Component/home-page/category/all-units-category/all-units-category.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';

const routes: Routes = [
  { path: 'addUnit', component: AddUnitComponent, canActivate: [userAuthGGuard] },
  { path: 'selectDuration', component: SelectDurationComponent },
  { path: 'det/:id', component: UnitDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  {path: 'Allunits/:cityonly', component: UnitBuildingComponent, title: 'Unit List'},
  {path: 'Allunits/:area/:category/:priceType/:government', component: UnitBuildingComponent, title: 'Unit List'},
  {path: 'Allun/:id', component: AllUnitsCategoryComponent, title: 'Unit List'},
];

@NgModule({
  declarations: [
    AddUnitComponent,
    SelectDurationComponent,
    UnitDetailsComponent,
    UnitBuildingComponent,
    AllUnitsCategoryComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UnitModule { }
