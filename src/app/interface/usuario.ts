export interface Usuario {
  email: string,
  password: string,

}

export enum tipoUsuario {
  Paciente = 'Paciente',
  Especialista = 'Especialista',
  Administrador = 'Administrador',
  Desconocido = 'Desconocido'
}
  /*
  public nombre: string;
  public apellido: string;
  public edad: number;
  public dni: number;
  public obraSocial: string;
  public email: string;
  public especialidad: string;
  public habilitado: boolean;
  public foto1: string;
  public foto2: string
*/