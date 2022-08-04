import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { tipoUsuario, Usuario } from 'src/app/interface/usuario';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { GuardsService } from 'src/app/services/guards.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Horarios } from 'src/app/interface/horarios';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {


  public horariosManana: any[] = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"
  ]

  public horariosTarde: any[] = [
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
  ]

  public horariosSeleccionados: Horarios[] = [];

  public usuario: any = {
    nombre: '',
    apellido: '',
    edad: '',
    dni: '',
    obraSocial: '',
    email: '',
    especialidad: '',
    habilitado: '',
    foto1: '',
    foto2: '',
    tipo: '',
    horariosManana: ['', ''],
    horariosTarde: ['', '']
  };

  public tipoUsuario: tipoUsuario;

  constructor(
    private autenticarSV: AutenticarService,
    private guardSV: GuardsService,
    private usuariosSV: UsuariosService
  ) {
    this.tipoUsuario = tipoUsuario.Desconocido;
  }

  ngOnInit(): void {
    this.obtenerUsuarioDatos()


    console.log(this.usuario)
  }

  ver() {


    this.usuariosSV.modificarEspecialista(this.usuario.email, this.usuario)
      .then(res => {
        console.log('respuesta al modificar especialista:', res)
      })
      .catch(err => {
        console.log('error al modificar especialista:', err)
      })
  }

  checkHorarioManana(horario: string) {
    let bandera = false;
    if (this.usuario.horariosManana != undefined) {
      this.usuario.horariosManana.forEach((horarioUsuario: string) => {
        if (horarioUsuario == horario) {
          bandera = true
        }
      })
    }

    return bandera
  }

  onChangeHorarioManana($event: any) {

    let horarioUsuario = this.usuario.horariosManana;

    if ($event.target.checked) {
      const index = horarioUsuario.indexOf($event.target.value, 0);
      if (index == -1) {
        horarioUsuario.push($event.target.value);
      }
      else {
        console.log('error', $event);
      }

    }
    else {
      const index = horarioUsuario.indexOf($event.target.value, 0);
      if (index > -1) {
        horarioUsuario.splice(index, 1);
      }
      else {
        console.log('error', $event);
      }
    }
    this.usuario.horariosManana = horarioUsuario;
    console.log(this.usuario.horariosManana);
  }

  onChangeHorarioTarde($event: any) {
    //console.log($event.target.value);
    //console.log($event.target.checked);
    let horarioUsuario = this.usuario.horariosTarde;
    //console.log(horarioUsuario);
    //console.log(this.usuario.horariosTarde);
    if ($event.target.checked) {
      const index = horarioUsuario.indexOf($event.target.value, 0);
      if (index == -1) {
        horarioUsuario.push($event.target.value);
      }
      else {
        console.log('error', $event);
      }

    }
    else {
      const index = horarioUsuario.indexOf($event.target.value, 0);
      if (index > -1) {
        horarioUsuario.splice(index, 1);
      }
      else {
        console.log('error', $event);
      }
    }
    this.usuario.horariosTarde = horarioUsuario;
    console.log(this.usuario.horariosTarde);
  }

  checkHorarioTarde(horario: string) {
    let bandera = false;
    if (this.usuario.horariosTarde != undefined) {
      this.usuario.horariosTarde.forEach((horarioUsuario: string) => {
        if (horarioUsuario == horario) {
          bandera = true
        }
      })
    }

    return bandera
  }


  obtenerUsuarioDatos() {
    this.autenticarSV.getUserLogged().subscribe(userLogged => {

      this.autenticarSV.obtenerTodos("paciente").subscribe(i => {
        i.forEach(user => {
          console.log('buscando pacientes...')
          if (user.email == userLogged?.email) {
            console.log('paciente encontrado')
            this.usuario = user
          }
        })
      })

      this.usuariosSV.getEspecialistas().subscribe(i => {
        i.forEach(user => {
          console.log('buscando especialistas...')
          if (user.email == userLogged?.email) {
            console.log('especialista encontrado')
            
            //PARCHEEEEEEEE
            if(user.horariosManana == undefined) {
              user.horariosManana = this.horariosManana
            }
            if(user.horariosTarde == undefined) {
              user.horariosTarde = this.horariosTarde
            }
            this.usuario = user
            this.tipoUsuario = tipoUsuario.Especialista;
          }
        })
      })

      this.autenticarSV.obtenerTodos("administradores").subscribe(i => {
        i.forEach(user => {
          console.log('buscando administradores...')
          if (user.email == userLogged?.email) {
            console.log('administrador encontrado')
            this.usuario = user
            this.tipoUsuario = tipoUsuario.Administrador;
          }
        })
      })
    })
  }

}
