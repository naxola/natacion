import { Routes } from '@angular/router';
import { AdminHomeComponent } from './home/home.component';
import { ConfigTurnosComponent } from './turnos/config.turnos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';



export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
        { 
          path: 'home', component: AdminHomeComponent, 
          data: { title: 'Panel de control', urls: [{title: 'Inicio', url: '/admin/home'},{title: '...'}]} 
        },
        { 
          path: 'turnos', component: ConfigTurnosComponent, 
          data: { title: 'Configuración de turnos', urls: [{title: 'Inicio', url: '/admin/home'},{title: 'Turnos'}]} 
        },
        { 
          path: 'alumnos', component: AlumnosComponent, 
          data: { title: 'Gestión de alumnos', urls: [{title: 'Inicio', url: '/admin/home'},{title: 'Alumnos'}]} 
        }
    ]      
  }
];