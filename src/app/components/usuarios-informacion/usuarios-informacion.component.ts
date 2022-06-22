import { Component, OnInit } from '@angular/core';

import { Paciente } from 'src/app/class/paciente';
import { Especialista } from 'src/app/class/especialista';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Administrador } from 'src/app/class/administrador';

@Component({
  selector: 'app-usuarios-informacion',
  templateUrl: './usuarios-informacion.component.html',
  styleUrls: ['./usuarios-informacion.component.scss']
})
export class UsuariosInformacionComponent implements OnInit {

  public activarEspecialistas:boolean;
  public activarPacientes:boolean

  public listaPacientes?:Paciente[];
  public listaEspecialistas?:Especialista[];
  private listaAdministrador?:Administrador[];

  constructor(private usuariosService: UsuariosService, ) { 
    this.activarEspecialistas = false;
    this.activarPacientes = false;
  }

  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerEspecialistas();
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

  lanzarEventoHabilitarEspecialista(especialista:Especialista){
    //console.log('foto1', especialista.foto1)
    this.listaEspecialistas?.forEach(esp =>  {
      if(esp.email == especialista.email && esp.habilitado){
        esp.habilitado = false;
      }
      else if(esp.email == especialista.email)
      {
        esp.habilitado = true;
      }
   });

  }

  guardarCambiosEspecialistas()
  {
    this.listaEspecialistas?.forEach(especialista =>{
      this.usuariosService.modificarEspecialista(especialista.email, especialista)
          .then(res => {
            console.log('respuesta al modificar especialista:', res)
          })
          .catch(err => {
            console.log('error al modificar especialista:', err)
          })
    })
  }

  selecPacientes()
  {
    if(this.activarPacientes)
    {
      this.activarPacientes = false;
    }
    else
    {
      this.activarPacientes = true;
    }
  }

  selecEspecialistas()
  {
    if(this.activarEspecialistas)
    {
      this.activarEspecialistas = false;
    }
    else
    {
      this.activarEspecialistas = true;
    }
  }
}
