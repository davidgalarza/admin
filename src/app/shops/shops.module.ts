import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShopsRoutes } from './shops.routing';

import { NewComponent } from './new/new.component';
import { AllComponent } from './all/all.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ShopsRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      NewComponent,
      AllComponent,
      ViewComponent,
  ]
})

export class Shops {}
