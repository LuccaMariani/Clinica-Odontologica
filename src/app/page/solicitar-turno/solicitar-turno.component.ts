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
import { tipoUsuario, Usuario } from 'src/app/interface/usuario';
import { ThisReceiver } from '@angular/compiler';
import { Especialidad } from 'src/app/interface/especialidad';
import { Especialidades } from 'src/app/class/especialidades';
import { getAuth } from 'firebase/auth';

import { IfStmt } from '@angular/compiler';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { time } from 'console';

import { Router } from '@angular/router';



@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  //
  public pasoSwitch = 1;
  //

  public fechasParaTurnos: string[] = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  public horariosParaTurnos: string[] = [
    '8:00', '8:30',
    '9:00', '9:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30'];

  // se usan
  public turnoSeleccionado: any;
  public especialistaSeleccionado: Especialista = new Especialista();
  public especialidadSeleccionada: any;
  public fechaSeleccionada: any;
  public horarioSeleccionado: any;
  //

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

  public registroTurnoForm!: FormGroup;

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
  public paciente:Paciente;
  //horariosMañana = ["08:00", "09:00", "10:00", "11:00"]
  //horariosTarde = ["14:00", "15:00", "16:00", "17:00"]

  //robado, trae usuario y paciente
  public pacienteSeleccionado: any[] = []
  public usuarioB: any;
  public usuarioLog: any;
  //

  constructor(
    private readonly fb: FormBuilder,
    private usuariosSV: UsuariosService,
    private autenticarSV: AutenticarService,
    private especialidadesSV: EspecialdadesService,
    private turnoService: TurnosService,
    private horarioService: HorariosService,
    private ruteo: Router) {
      this.paciente =  this.autenticarSV.obtenerUsuarioDatos()
  }

  ngOnInit(): void {


    //robado, trae usuario y paciente
    const auth = getAuth();
    console.log()
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      console.log(this.usuarioLog);
      /*
      this.usuarioB = this.serv.traerUsuario(this.usuarioLog);
      console.log(this.usuario);*/
    }
    /*
    if (this.usuarioB.paciente) {
      console.log(this.usuarioB.paciente);
      this.pacienteSeleccionado = [];
      this.pacienteSeleccionado.push(this.usuarioB.id);
      this.pacienteSeleccionado.push(this.usuarioB.nombre + ' ' + this.usuarioB.apellido);
      //this.viewPacientes = true;
    }*/

    //

    this.obtenerDatosUsuario();
    this.obtenerDatos();
    this.MaxmimoTurno();
    this.registroTurnoForm = this.initForm();

    this.cargarFechas();
    console.log('turnos', this.fechasParaTurnos);


  }

  initForm(): FormGroup {
    return this.fb.group({
      especialidad: new FormControl('', [Validators.required]),
      especialista: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required, Validators.minLength(4)]),
    }, { validators: this.HoraValidator('hora') },
    );
  }

  obtenerEspecialidades() {
    return this.listaEspecialidades
  }

  selecEspecialista(especialista: Especialista) {
    this.especialistaSeleccionado = especialista;

    console.log('especialistaSeleccionado :', this.especialistaSeleccionado)

    if (this.especialistaSeleccionado != undefined) {
      this.pasoSwitch = 2;
    }
  }

  selecEspecialidad(especialidad: Especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.pasoSwitch = 3;
    this.cargarFechas();
    console.log('especialidad seleccioanda', this.especialidadSeleccionada);
  }

  selecFecha(fecha: any) {
    this.fechaSeleccionada = fecha;
    this.pasoSwitch = 4;
    console.log('fecha seleccioanda', this.fechaSeleccionada);
  }

  selecHorario(horario: any) {
    this.horarioSeleccionado = horario;
    this.pasoSwitch = 5;
    console.log('horario seleccioando', this.horarioSeleccionado);
  }


  obtenerEspecialistas() {
    return this.listaEspecialidades;
  }

  horariosDisponibles() {
    return ''
  }



  siguiente() {
    this.pasoSwitch = this.pasoSwitch + 1
    this.cargarFechas();
    console.log('turnos', this.fechasParaTurnos);
  }

  atras() {
    if (this.pasoSwitch != 1) {
      this.pasoSwitch = this.pasoSwitch - 1
    }
  }

  cancelarTurno() {

  }

  public confirmarTurno() {
    this.crearTurno()
  }

  private crearTurno() {

    this.turnoSeleccionado = {
      //paciente:this.auth.UsuarioActivo,
      paciente: this.autenticarSV.obtenerUsuarioDatos(),
      especialista: this.especialistaSeleccionado,
      //fecha:turno,
      fecha: 'ACA VA fecha y horario',
      especialidad: this.especialidadSeleccionada,
      estado: 'pendiente',
      diagnostico: "",
      comentario_especialista: "",
      comentario_usuario: "",
      razon_cancelacion: "",
      historial: null
    }

    this.turnoService.agregarTurno(this.turnoSeleccionado).then((value) => {
      this.ruteo.navigateByUrl("mis_turnos");
    }
    );

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


  cargarFechas() {
    let i = 1;
    let now = new Date();

    for (let index = 0; index < this.fechasParaTurnos.length; index++) {

      if ((now.getDate() + index + 1) <= 31) {
        this.fechasParaTurnos[index] = `${now.getDate() + index + 1}-${now.getMonth() + 1}-${now.getFullYear()}`;
      }
      else {
        this.fechasParaTurnos[index] = `${now.getDate() + index + 1 - now.getDate() - (31 - now.getDate())}-${now.getMonth() + 2}-${now.getFullYear()}`;
      }
    }

    console.log('se cargaron las fechas para los turnos', this.fechasParaTurnos);
  }

  MaxmimoTurno() {

    let numWeeks = 2;
    let now = new Date();
    //now.setDate(now.getDate() + numWeeks * 7);

    (document.getElementById('fecha') as HTMLInputElement).max = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getUTCDay() + 14}`;
    (document.getElementById('fecha') as HTMLInputElement).min = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getUTCDay() - 1}`;

    console.log('aaaa', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getUTCDay() + 14}`);
    console.log('aaaa', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getUTCDay() - 1}`);
  }

  HoraValidator(controlHora: string): ValidatorFn {

    /*
      return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup
        const hora = formGroup.get(controlHora)?.value;
        //console.log(this.especialista);




        if (this.especialista != null) {



          let horaMin = Date.parse(`01/01/2011 ${this.especialista.data.especialista.horaMin}`);
          let horaMax = Date.parse(`01/01/2011 ${this.especialista.data.especialista.horaMax}`);


          let horaAux = Date.parse(`01/01/2011 ${hora}`);
          console.log("hora min: " + horaMin + " hora max: " + horaMax);
          console.log("hora elegida" + horaAux);
          if (horaAux >= horaMin && horaAux <= horaMax) {
            //console.log("hora min: "+this.especialista.data.especialista.horaMin+" hora max: "+this.especialista.data.especialista.horaMax);
            //console.log("hora elegida"+hora);
            console.log("entro");
            let turnoAux2 = JSON.stringify(this.turnoList);
            let turnoAux3 = JSON.parse(turnoAux2);
            //console.log(turnoAux2);  // output: Apple Orange Banana
            //console.log(turnoAux3);  // output: Apple Orange Banana
            for (let i = 0; i < turnoAux3.length; i++) {
              console.log(turnoAux3[i]);

              let horaAuxTurno = Date.parse(`01/01/2011 ${turnoAux3[i].data.data.hora}`);
              //let horaAux=Date.parse(`01/01/2011 ${hora}`);
              console.log("HORARIO EN USO " + horaAuxTurno);
              console.log("NUEVO TURNO " + horaAux);
              console.log("HORARIO EN USO MAX" + (horaAuxTurno + 900000));

              if ((horaAuxTurno + 900000) >= horaAux && horaAuxTurno <= horaAux) {
                console.log("fallo2");
                return { turnoSuperpuesto: true }
              } else {
                console.log("entro2");
                return null;
              }
            }


            return null;
          } else {
            return { errorHorasMaxMin: true }
          }

        } else {
          return { errorHorasMaxMin: true };
        }





      }*/
    return (control: AbstractControl): ValidationErrors | null => { return null; }
  }


}
