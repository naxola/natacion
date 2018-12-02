// Sidebar route metadata
import { UserRole } from '../../core/models/user.model';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    label: string;
    labelClass: string;
    extralink: boolean;
    roles: UserRole[];
    submenu : RouteInfo[];
}
