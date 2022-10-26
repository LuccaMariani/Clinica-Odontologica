import { Component, OnInit } from '@angular/core';

import { EstadoTurno, Turno } from 'src/app/interface/turno';

import { TurnosService } from 'src/app/services/turnos.service';
import { EspecialdadesService } from 'src/app/services/especialidades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AutenticarService } from 'src/app/services/autenticar.service';
//import { FirebaseService } from '../servicios/firebase.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { Administrador } from 'src/app/class/administrador';
import { tipoUsuario } from 'src/app/interface/usuario';
import { ThisReceiver } from '@angular/compiler';
import { Especialidad } from 'src/app/interface/especialidad';
import { Especialidades } from 'src/app/class/especialidades';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  public especialidades: any
  public especialistas?: Especialista[];

  public turnos: any
  public horarios: any

  public usuario: any;
  public tipoUsuario?: tipoUsuario;

  public listaPacientes?: Paciente[];
  public listaEspecialistas?: Especialista[];
  public listaAdministrador?: Administrador[];
  public listaTurnos?: Turno[];
  public listaEspecialidades?: any[];


  public turno: Turno = {
    id: '',
    fecha: '',
    especialidadNombre: '',
    pacienteMail: '',
    especialistaMail: '',
    estado: EstadoTurno.Pendiente,
    comentario: '',
    encuesta: '',
  }

  datos = {
    especialidad: null,
    fecha: null,
    especialistaId: null,
    especialista: null,
    horarioSeleccionado: null
  }

  //horariosMañana = ["08:00", "09:00", "10:00", "11:00"]
  //horariosTarde = ["14:00", "15:00", "16:00", "17:00"]

  

  constructor(
    private usuariosSV: UsuariosService,
    private autenticarSV: AutenticarService,
    private especialidadesSV: EspecialdadesService,
    private turnoService: TurnosService,
    private horarioService: HorariosService) {
  }

  ngOnInit(): void {
    this.obtenerDatosUsuario();
    this.obtenerDatos();
  }

  obtenerEspecialidades() {
    return this.listaEspecialidades
  }
  seleccionarEspecialidad(especialidad: Especialidad) {
    //this.datos.especialidad = especialidad.valor

  }

  obtenerEspecialistas(){

    return this.listaEspecialidades
  }

  seleccionarEspecialista(especialista: Especialista){

  }

  horariosDisponibles(){
    return ''
  }

  seleccionarHorario(horarioDisponible:any){

  }

  crearTurno(){

  }

  obtenerDatosUsuario() {
    this.autenticarSV.getUserLogged().subscribe(userLogged => {
      this.usuariosSV.getPacientes().subscribe(i => {
        i.forEach(user => {
          console.log('buscando pacientes...')
          if (user.email == userLogged?.email) {
            console.log('paciente encontrado')
            this.usuario = user
          }
        })
      })

      this.usuariosSV.getAdmins().subscribe(i => {
        i.forEach(user => {
          console.log('buscando pacientes...')
          if (user.email == userLogged?.email) {
            console.log('paciente encontrado')
            this.usuario = user
          }
        })
      })
    })
  }


  obtenerDatos() {
    this.usuariosSV.getPacientes().subscribe(res => {
      this.listaPacientes = res;
    })

    this.usuariosSV.getAdmins().subscribe(res => {
      this.listaAdministrador = res;
    })

    this.usuariosSV.getEspecialistas().subscribe(res => {
      this.listaEspecialistas = res;
    })

    this.turnoService.getTurnos().subscribe(res => {
      this.listaTurnos = res;
    })

    this.especialidadesSV.getEspecialidades().subscribe(res => {
      this.listaEspecialidades = res;
    })
  }

}
