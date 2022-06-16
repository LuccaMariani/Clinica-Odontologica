export interface Turno {
    id: string
    fecha: Date;
    especialidadNombre: string;
    pacienteMail: string;
    especialistMail: string;
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
