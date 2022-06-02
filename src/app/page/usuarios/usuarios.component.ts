import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public selecInfo: boolean;
  public selecCrear: boolean;

  constructor() {
    this.selecInfo = false;
    this.selecCrear = false;
  }

  ngOnInit(): void {
  }


  public selecInformacionUsuarios() {
    this.selecCrear = false;
    this.selecInfo = true;
  }

  public selecCrearUsuario() {
    this.selecCrear = true;
    this.selecInfo = false;
  }
}
