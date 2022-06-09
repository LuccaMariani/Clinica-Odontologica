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


  userLogged = this.autenticarService.getUserLogged();

  public usuarioLogueado: string = "";

  private listaPacientes?: Paciente[];
  private listaEspecialistas?: Especialista[];
  private listaAdmins?: Administrador[];

  constructor(private autenticarService: AutenticarService, private usuariosService: UsuariosService) {

  }


  ngOnInit(): void {
    this.autenticarService.getUsuarioLogueado().then((res) => {
      console.log(res?.email);
      this.usuarioLogueado = res?.email?.toString() ?? '';
    })

    this.obtenerPacientes();
    this.obtenerEspecialistas();
    this.obtenerAdmins();


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

  getTipoUsuario(): usuario {
    let tipoUsuario: usuario = usuario.desconocido;

    this.listaAdmins?.forEach(admin => {
      console.log('casi entro admins', admin.email);
      if (admin.email == this.usuarioLogueado) {
        console.log('entro admins');
        tipoUsuario = usuario.admin;
      }
    });

    if (tipoUsuario == usuario.desconocido) {
      this.listaEspecialistas?.forEach(espe => {
        console.log('casi entro especialsitas', espe.email);
        if (espe.email == this.usuarioLogueado) {
          console.log('entro especialsitas');
          tipoUsuario = usuario.especialista;
        }
      });
      if (tipoUsuario == usuario.desconocido) {
        this.listaPacientes?.forEach(paci => {
          console.log('casi entro pacientes', paci.email);
          if (paci.email == this.usuarioLogueado) {
            console.log('entro pacientes');
            tipoUsuario = usuario.paciente;
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

  LogOut() {
    this.autenticarService.logout();
  }
}
