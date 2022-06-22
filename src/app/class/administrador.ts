export class Administrador {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public email: string;
    public habilitado: boolean;
    public foto1: string;
    public tipo: string;
    
    constructor(nombre: string = '', apellido: string = '', edad: number = 0, dni: number = 0,
     email: string = '', habilitado: boolean = false, foto1: string = 'sinFoto',
     tipo:string = 'administrador') {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.email = email;
        this.habilitado = habilitado;
        this.foto1 = foto1;
        this.tipo = tipo;
    }
}