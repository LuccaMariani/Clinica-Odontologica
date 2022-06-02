export class Paciente {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public obraSocial: string;
    public email: string;

    constructor(nombre: string = '', apellido: string = '', edad: number = 0, dni: number = 0, obraSocial: string = '', email: string = '',) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.email = email;
    }
}