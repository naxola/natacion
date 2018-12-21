import { Turno } from "./turno.model";
import { Student } from "./student.model";

export class RegTurnoUserStudent {
    id: number;
    userFirstName: string;
    userLastName: string;
    userMail: string;
    userPhone: number;
    student: Student;
    turnos: Turno[];
}