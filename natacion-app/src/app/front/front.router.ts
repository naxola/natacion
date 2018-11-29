import { Routes } from '@angular/router';

import { FrontHomeComponent } from './home/fronthome.component';
import { StudentRegisterComponent } from './student/student-reg.component';

export const FrontPagesRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'home',
      component: FrontHomeComponent
    }, {
      path: 'register',
      component: StudentRegisterComponent
    }]
  }
];
