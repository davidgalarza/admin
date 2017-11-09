import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlipersRoutes } from './blipers.routing';
import { AllComponent } from './all/all.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BlipersRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      AllComponent,

  ]
})

export class Blipers {}
