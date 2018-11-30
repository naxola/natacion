import { Routes } from '@angular/router';

import { FrontHomeComponent } from './home/fronthome.component';
import { StudentRegisterComponent } from './student/student-reg.component';

export const FrontPagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: FrontHomeComponent, data: { 
                                                            title: 'Home', 
                                                            urls: [{title: 'Home', url: '/'},{title: 'Inicio'}] 
                                                          }},
      { path: 'register', component: StudentRegisterComponent, data: { 
                                                            title: 'Registro de alumno', 
                                                            urls: [{title: 'Home',url: '/student'},{title: 'Registro de alumno'}]
                                                            }}
  ]
  }
];
