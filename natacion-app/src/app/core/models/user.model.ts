export enum  UserRole{
    ADMIN_ROLE,
    USER_ROLE
}
export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
}