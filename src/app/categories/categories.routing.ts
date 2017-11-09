import { Routes } from '@angular/router';

import { AllComponent } from './all/all.component';
import { NewComponent } from './new/new.component';

export const CategoriesRoutes: Routes = [
    {
    path: '',
    children: [ {
      path: 'all',
      component: AllComponent
    }]
    },{
    path: '',
    children: [ {
      path: 'new',
      component: NewComponent
    }]
    },/*{
        path: '',
        children: [ {
            path: 'wizard',
            component: WizardComponent
        }]
    }*/
];