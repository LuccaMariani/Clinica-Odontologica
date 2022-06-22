import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Usuario } from 'src/app/interface/usuario';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { GuardsService } from 'src/app/services/guards.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  usuario:any = {
    nombre : '',
    apellido: '',
    edad: '',
    dni: '',
    obraSocial: '',
    email: '',
    especialidad: '',
    habilitado: '',
    foto1: '',
    foto2: '',
    tipo: ''
  };
  

  //addDoc
  constructor(
    private autenticarSV: AutenticarService,
    private guardSV: GuardsService,
    private usuariosSV: UsuariosService
  ) { 

    
      
  }

  ngOnInit(): void {
    this.obtenerUsuarioDatos();
  }

  ver(){

    
  }


  obtenerUsuarioDatos() {
    this.autenticarSV.getUserLogged().subscribe(userLogged => {
      this.autenticarSV.obtenerTodos("paciente").subscribe(i => {
        i.forEach(user => {
          if (user.email == userLogged?.email) {
            this.usuario = user
          }
        })
      })
      this.autenticarSV.obtenerTodos("especialista").subscribe(i => {
        i.forEach(user => {
          if (user.email == userLogged?.email) {
            this.usuario = user
          }
        })
      })

      this.autenticarSV.obtenerTodos("administradores").subscribe(i => {
        i.forEach(user => {
          if (user.email == userLogged?.email) {
            this.usuario = user
          }
        })
      })
    })
    
  }

}
