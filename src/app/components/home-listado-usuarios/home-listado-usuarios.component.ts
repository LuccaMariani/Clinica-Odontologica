import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { UsuariosService} from 'src/app/services/usuarios.service';

import { Paciente } from 'src/app/class/paciente';
import { Especialista } from 'src/app/class/especialista';
import { Administrador } from 'src/app/class/administrador';

@Component({
  selector: 'app-home-listado-usuarios',
  templateUrl: './home-listado-usuarios.component.html',
  styleUrls: ['./home-listado-usuarios.component.scss']
})
export class HomeListadoUsuariosComponent implements OnInit {
  

  @Output() datosUsuario = new EventEmitter<any>();

  public listaPacientes?:Paciente[];
  public listaEspecialistas?:Especialista[];
  public listaAdministrador?:Administrador[];

  constructor(private usuariosService:UsuariosService) { }

  obtener(){
    console.log('holaa')
    console.log(this.listaPacientes);
    console.log(this.listaEspecialistas);
    console.log(this.listaAdministrador);
  }

  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerEspecialistas();
    this.obtenerAdmins();
  }

  obtenerPacientes(){
    this.usuariosService.getPacientes().subscribe(res=>{
      this.listaPacientes = res;
    })
  }

  obtenerEspecialistas(){
    this.usuariosService.getEspecialistas().subscribe(res=>{
      this.listaEspecialistas = res;
    })
  }

  obtenerAdmins(){
    this.usuariosService.getAdmins().subscribe(res=>{
      this.listaAdministrador = res;
    })
  }

  selecUsuario(mail:string, password:string) {
    let usuario = {
      mail: mail,
      password: password
    }
    this.datosUsuario.emit(usuario);

  }
}
