export class Paciente {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public obraSocial: string;
    public email: string;
    public foto1: string;
    public foto2: string;

    constructor(nombre: string = '', apellido: string = '', edad: number = 0,
     dni: number = 0, obraSocial: string = '', email: string = '', foto1: string = 'sinFoto', foto2: string = 'sinFoto'
     ) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.email = email;
        this.foto1 = foto1;
        this.foto2 = foto2;
    }
}