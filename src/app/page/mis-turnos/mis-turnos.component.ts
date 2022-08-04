import { Component, OnInit } from '@angular/core';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { tipoUsuario } from 'src/app/interface/usuario';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  @Output() datosUsuario = new EventEmitter<any>();


  public tipoUsuario: tipoUsuario
  
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
    horariosManana: [],
    horariosTarde: []
  };

  constructor( private autenticarSV: AutenticarService,
    private usuariosSV: UsuariosService) { 
      this.tipoUsuario = tipoUsuario.Desconocido
    }

  ngOnInit(): void {
    this.obtenerUsuarioDatos();
  }

  obtenerUsuarioDatos() {
    this.autenticarSV.getUserLogged().subscribe(userLogged => {

      this.autenticarSV.obtenerTodos("paciente").subscribe(i => {
        i.forEach(user => {
          console.log('buscando pacientes...')
          if (user.email == userLogged?.email) {
            console.log('paciente encontrado')
            this.usuario = user
            this.tipoUsuario = tipoUsuario.Paciente;
          }
        })
      })

      this.autenticarSV.obtenerTodos("especialista").subscribe(i => {
        i.forEach(user => {
          console.log('buscando especialistas...')
          if (user.email == userLogged?.email) {
            console.log('especialista encontrado')
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
