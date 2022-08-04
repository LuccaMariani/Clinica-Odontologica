import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.scss']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  private usuario:any = '';

  constructor( private autenticarSV: AutenticarService,
    private usuariosSV: UsuariosService) { 
    }

  ngOnInit(): void {
    
  }


  obtenerEspecialista(){
    this.autenticarSV.getUserLogged().subscribe(userLogged => {
      this.usuariosSV.getEspecialistas().subscribe(i => {
        i.forEach(user => {
          console.log('buscando especialistas...')
          if (user.email == userLogged?.email) {
            console.log('especialista encontrado')
            this.usuario = user
          }
        })
      })
    })


  }
}
