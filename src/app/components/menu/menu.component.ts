import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Paciente } from 'src/app/class/paciente';
import { Administrador } from 'src/app/class/administrador';


enum usuario {
  paciente = 'paciente',
  especialista = 'especialista',
  admin = 'admin',
  desconocido = 'desconocido'
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  public userLogged = this.autenticarService.getUserLogged();

  public usuarioLogueado: string = "";

  private listaPacientes?: Paciente[];
  private listaEspecialistas?: Especialista[];
  private listaAdmins?: Administrador[];

  constructor(private autenticarService: AutenticarService, private usuariosService: UsuariosService) {
  }


  ngOnInit(): void {


  }




  mostrar() {
    console.log('usuario logeado', this.usuarioLogueado);
  }

  LogOut() {
    this.autenticarService.logout();
  }
}
