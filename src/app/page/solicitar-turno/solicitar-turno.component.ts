import { Component, OnInit } from '@angular/core';

import { Turno } from 'src/app/interface/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { EspecialdadesService } from 'src/app/services/especialidades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { FirebaseService } from '../servicios/firebase.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { Especialidades } from 'src/app/components/register-especialista/register-especialista.component';
import { Especialista } from 'src/app/class/especialista';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  public especialidades: any
  public especialistas?:Especialista[];
  
  public turnos: any
  public horarios: any

  datos = {
    especialidad: null,
    fecha: null,
    especialistaId: null,
    especialista: null,
    horarioSeleccionado: null
  }

  horariosMañana = ["08:00", "09:00", "10:00", "11:00"]
  horariosTarde = ["14:00", "15:00", "16:00", "17:00"]

  turno?: Turno

  constructor(
    private usuariosService: UsuariosService,
    private especialidadesService: EspecialdadesService,
    private turnoService: TurnosService,
    private horarioService: HorariosService) {

    especialidadesService.getEspecialidades().subscribe( esp => {
      this.especialidades = esp
    })

    this.usuariosService.getEspecialistas().subscribe(x => {
      this.especialistas = x
    })

    turnoService.turnos.subscribe(x => {
      this.turnos = x
    })

    horarioService.traerHorarios().subscribe(x => {
      this.horarios = x
    })

  }

  ngOnInit(): void {
  }

  obtenerEspecialidades() {
    return this.especialidades
  }

  obtenerHorariosDisponibles() {
    if(this.datos.especialista == null){
      return []
    }
    //let hor = this.horarios.filter((x: { especialistaId: any; }) => x.especialistaId == this.datos.especialista?.uid)
    let horariosDisponibles = []
    horariosDisponibles.push("08:00")
    /*
    if (hor) {
      hor = hor[0]
      let turnosEspecialista = this.turnos.filter((x: { especialistaId: any; }) => x.especialistaId == this.datos.especialista?.uid)

      if(turnosEspecialista.find((x: { fecha: { nanoseconds: string | number | Date; }; }) => (new Date(x.fecha.nanoseconds).getHours() % 12  || 12) == 8) == null){
        horariosDisponibles.push("08:00")
      }
      if(turnosEspecialista.find((x: { fecha: { nanoseconds: string | number | Date; }; }) => (new Date(x.fecha.nanoseconds).getHours() % 12  || 12) == 9) == null){
        horariosDisponibles.push("09:00")
      }
      if(turnosEspecialista.find((x: { fecha: { nanoseconds: string | number | Date; }; }) => (new Date(x.fecha.nanoseconds).getHours() % 12  || 12) == 10) == null){
        horariosDisponibles.push("10:00")
      }
      if(turnosEspecialista.find((x: { fecha: { nanoseconds: string | number | Date; }; }) => (new Date(x.fecha.nanoseconds).getHours() % 12  || 12) == 11) == null){
        horariosDisponibles.push("11:00")
      }
    }*/
    return horariosDisponibles
  }



  obtenerTurnosEspecialista(especialistaId: string) {
    return this.turnos.filter((x: { especialistaId: string; }) => x.especialistaId == especialistaId).map((x: { fecha: any; }) => x.fecha)
  }

  obtenerFechaFormateada(time: { nanoseconds: string | number | Date; }) {
    return new Date(time.nanoseconds)
  }

  seleccionarEspecialidad(especialidad: any) {
    console.log(especialidad);
    this.datos.especialidad = especialidad
  }

  seleccionarEspecialista(especialista: any) {
    console.log(especialista);
    this.datos.especialista = especialista
  }

  seleccionarHorario(horario: any) {
    this.datos.horarioSeleccionado = horario
  }

  crearTurno() {
    /*
    let partesHorario = this.datos.horarioSeleccionado.split(":")
    let date = new Date()
    date.setHours(partesHorario[0], partesHorario[1], 0)
    let turno = new Turno()
    turno.fecha = date
    turno.pacienteId = this.firebaseService.usuarioLogueado.id
    turno.estado = "Nuevo"
    turno.especialistaId = this.datos.especialista.uid
    turno.nombreEspecialidad = this.datos.especialidad

    this.turnoService.agregarTurno(turno)
    alert("Creado")
    */
  }
}
