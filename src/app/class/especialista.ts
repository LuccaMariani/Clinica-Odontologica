import { Especialidad } from "../interface/especialidad";

export class Especialista {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public especialidades: Especialidad[];
    public email: string;
    public habilitado: boolean;
    public foto1: string;
    public tipo: string;
    public horariosManana: any[];
    public horariosTarde: any[];

    constructor(
        nombre: string = '',
        apellido: string = '',
        edad: number = 0,
        dni: number = 0,
        especialidades: Especialidad[],
        email: string = '',
        habilitado: boolean = false,
        foto1: string = 'sinFoto',
        tipo:string = 'especialista', 
        horariosManana: any[] = [''],
        horariosTarde: any[] = [''],
    ) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidades = especialidades;
        this.email = email;
        this.habilitado = habilitado;
        this.foto1 = foto1;
        this.tipo = tipo;
        this.horariosManana = horariosManana;
        this.horariosTarde = horariosTarde;
    }
}