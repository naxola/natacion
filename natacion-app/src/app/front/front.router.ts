import { Routes } from '@angular/router';

import { FrontHomeComponent } from './home/fronthome.component';
import { StudentRegisterComponent } from './student/student-reg.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigTurnosComponent } from './configuration/turnos/turnos.component';
import { RegAlumnoComponent } from './reg-alumno/reg-alumno.component';
import { RegistroTurnoComponent } from './configuration/register/reg-turno.component';

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
                                                            urls: [{title: 'Home',url: '/'},{title: 'Registro de alumno'}]
                                                            }},
      { path: 'profile', component: ProfileComponent, data: { 
                                                            title: 'Perfil de usuario', 
                                                            urls: [{title: 'Home',url: '/'},{title: 'Perfil de usuario'}]
                                                            }},
      { path: 'config/turnos', component: ConfigTurnosComponent, data: { 
                                                              title: 'Configuración de turnos', 
                                                              urls: [{title: 'Home',url: '/'},{title: 'Configuracion de turnos'}]
                                                              }},
      { path: 'alumno', component: RegAlumnoComponent, data: { 
                                                                title: 'Alumno', 
                                                                urls: [{title: 'Home',url: '/'},{title: 'Alumno'}]
                                                                }},
      { path: 'turnos', component: RegistroTurnoComponent, data: { 
                                                                  title: 'Turnos', 
                                                                  urls: [{title: 'Home',url: '/'},{title: 'Registro de turnos'}]
                                                                  }}
    ]
  }
];
