import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Paciente } from 'src/app/class/paciente';
import { Administrador } from 'src/app/class/administrador';


enum tiposUsuarios {
  paciente = 'paciente',
  especialista = 'especialista',
  admin = 'admin',
  desconocido = 'desconocido'
}



@Injectable({
  providedIn: 'root'
})
export class GuardsService {
  userLogged = this.autenticarService.getUserLogged();

  public usuarioLogueado?: string;

  private listaPacientes?: Paciente[];
  private listaEspecialistas?: Especialista[];
  private listaAdmins?: Administrador[];

  constructor(private autenticarService: AutenticarService, private usuariosService: UsuariosService) { }

  activar() {

    this.autenticarService.getUsuarioLogueado().then((res) => {
      console.log(res?.email);
      this.usuarioLogueado = res?.email?.toString() ?? '';
    })

    this.obtenerPacientes();
    this.obtenerEspecialistas();
    this.obtenerAdmins();

    console.log('SE ACTIVO BIEN');
  }


  obtenerPacientes() {
    this.usuariosService.getPacientes().subscribe(res => {
      this.listaPacientes = res;
    })
  }

  obtenerEspecialistas() {
    this.usuariosService.getEspecialistas().subscribe(res => {
      this.listaEspecialistas = res;
    })
  }

  obtenerAdmins() {
    this.usuariosService.getAdmins().subscribe(res => {
      this.listaAdmins = res;
    })
  }

  getTipoUsuario(): tiposUsuarios {
    
    let tipoUsuario: tiposUsuarios = tiposUsuarios.desconocido;

    this.listaAdmins?.forEach(admin => {
      console.log('casi entro admins', admin.email);
      if (admin.email == this.usuarioLogueado) {
        console.log('entro admins');
        tipoUsuario = tiposUsuarios.admin;
      }
    });

    if (tipoUsuario == tiposUsuarios.desconocido) {
      this.listaEspecialistas?.forEach(espe => {
        console.log('casi entro especialsitas', espe.email);
        if (espe.email == this.usuarioLogueado) {
          console.log('entro especialsitas');
          tipoUsuario = tiposUsuarios.especialista;
        }
      });
      if (tipoUsuario == tiposUsuarios.desconocido) {
        this.listaPacientes?.forEach(paci => {
          console.log('casi entro pacientes', paci.email);
          if (paci.email == this.usuarioLogueado) {
            console.log('entro pacientes');
            tipoUsuario = tiposUsuarios.paciente;
          }
        });
      }
    }

    return tipoUsuario;
  }


  mostrar() {
    console.log(this.getTipoUsuario());
    console.log('usuario logeado', this.usuarioLogueado);
  }

  obtener() {
    this.autenticarService.getUsuarioLogueado().then((res) => {
      console.log(res?.email);
      this.usuarioLogueado = res?.email?.toString() ?? '';
    })

  }
}
