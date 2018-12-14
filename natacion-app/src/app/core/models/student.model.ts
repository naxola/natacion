  export interface Fecha {
    day: number;
    month: number;
    year: number;
  }

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    fechaNacimiento: Fecha;
    numPie: number;
}