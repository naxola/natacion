import { RouteInfo } from './sidebar.metadata';
import { UserRole } from '../../core/models/user.model';

export const ROUTES: RouteInfo[] = [
    { path: '', title: 'Personal', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE] },
    { path: '/admin/home', title: 'Home', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE] },
    { path: '/admin/alumnos', title: 'Alumnos', icon: 'mdi mdi-account', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE] },
    { path: '', title: 'Gestión App', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.ADMIN_ROLE] },
    { path: '', title: 'Configuración', icon: 'mdi mdi-settings', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/admin/turnos', title: 'Turnos', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.ADMIN_ROLE] }
        ], roles: [UserRole.ADMIN_ROLE] },
];

