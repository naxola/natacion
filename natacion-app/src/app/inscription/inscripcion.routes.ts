import { Routes } from '@angular/router';

import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';

export const InscripcionRoutes: Routes = [
  {
    path: '',
    children: [
        { path: '', component: InicioComponent} ,
        { path: 'registro', component: RegistroComponent}
    ]      
  }
];
