export interface Turno {
    id: string
    fecha: string;
    especialidadNombre: string;
    pacienteMail: string;
    especialistaMail: string;
    estado: EstadoTurno;
    comentario: string;
    encuesta: any;
}

export enum EstadoTurno {
    Pendiente = 'Pendiente',
    Cancelado = 'Cancelado',
    Rechazado = 'Rechazado',
    Aceptado = 'Aceptado',
    Realizado = 'Realizado',
}
