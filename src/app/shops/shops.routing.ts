import { Routes } from '@angular/router';

import { NewComponent } from './new/new.component';
import { AllComponent } from './all/all.component';
import { ViewComponent } from './view/view.component';

export const ShopsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'new',
        component: NewComponent
    }]},{
    path: '',
    children: [ {
      path: 'all',
      component: AllComponent
    }]
    },{
    path: '',
    children: [ {
      path: '/:id',
      component: ViewComponent
    }]
    },/*{
        path: '',
        children: [ {
            path: 'wizard',
            component: WizardComponent
        }]
    }*/
];
