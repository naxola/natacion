import { RouteInfo } from './sidebar.metadata';
import { UserRole } from '../../core/models/user.model';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Personal', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE]
    },
    {
        path: '/starter', title: 'Starter Page', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE]
    },
    {
        path: '', title: 'UI Components', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.USER_ROLE, UserRole.ADMIN_ROLE]
    },{
        path: '', title: 'Component', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/component/accordion', title: 'Accordion', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/alert', title: 'Alert', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/carousel', title: 'Carousel', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/dropdown', title: 'Dropdown', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/modal', title: 'Modal', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/pagination', title: 'Pagination', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/poptool', title: 'Popover & Tooltip', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/progressbar', title: 'Progressbar', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/rating', title: 'Ratings', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/tabs', title: 'Tabs', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/timepicker', title: 'Timepicker', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/buttons', title: 'Button', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
            { path: '/component/cards', title: 'Card', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.ADMIN_ROLE] },
        ], roles: [UserRole.USER_ROLE]
    },
    {
        path: '', title: 'Menu Levels', icon: 'mdi mdi-arrange-send-backward', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: 'javascript:void(0);', title: 'Second Level', icon: '', class: '', label: '', labelClass: '', extralink: true, submenu: [], roles: [UserRole.USER_ROLE] },
            {
                path: '', title: 'Second Child', icon: '', class: 'has-arrow', label: '', labelClass: '', extralink: false,
                submenu: [
                    { path: 'javascript:void(0);', title: 'Third 1.1', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
                    { path: 'javascript:void(0);', title: 'Third 1.2', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [], roles: [UserRole.USER_ROLE] },
                ], roles: [UserRole.USER_ROLE]
            },
        ], roles: [UserRole.USER_ROLE]
    }
     
];

