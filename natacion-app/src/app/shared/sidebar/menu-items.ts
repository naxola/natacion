import { RouteInfo } from './sidebar.metadata';
import { UserRole } from '../../core/models/user.model';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Personal', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE]
    },
    {
        path: '/user/home', title: 'Home', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE]
    },
    
    {
        path: '', title: 'Gestión App', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.ADMIN_ROLE]
    },{
        path: '', title: 'Configuración', icon: 'mdi mdi-settings', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/user/config/turnos', title: 'Turnos y horarios', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.ADMIN_ROLE] },
            { path: '/user/turnos', title: 'Turnos', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.ADMIN_ROLE] }
            
        ], roles: [UserRole.ADMIN_ROLE]
    },
];

