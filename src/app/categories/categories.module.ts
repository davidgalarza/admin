import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutes } from './categories.routing';
import { AllComponent } from './all/all.component';
import { NewComponent } from './new/new.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriesRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      AllComponent,
      NewComponent,

  ]
})

export class Categories {}