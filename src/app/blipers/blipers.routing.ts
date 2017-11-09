import { Routes } from '@angular/router';

import { AllComponent } from './all/all.component';


export const BlipersRoutes: Routes = [
    {
    path: '',
    children: [ {
      path: 'all',
      component: AllComponent
    }]
    }/*,{
    path: '',
    children: [ {
      path: '/:id',
      component: ViewComponent
    }]
    },{
        path: '',
        children: [ {
            path: 'wizard',
            component: WizardComponent
        }]
    }*/
];