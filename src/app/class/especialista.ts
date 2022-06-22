export class Especialista {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public especialidad: string;
    public email: string;
    public habilitado: boolean;
    public foto1: string;
    public tipo: string;

    constructor(
        nombre: string = '',
        apellido: string = '',
        edad: number = 0,
        dni: number = 0,
        especialidad: string = '',
        email: string = '',
        habilitado: boolean = false,
        foto1: string = 'sinFoto',
        tipo:string = 'especialista'
    ) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidad = especialidad;
        this.email = email;
        this.habilitado = habilitado;
        this.foto1 = foto1;
        this.tipo = tipo;
    }
}