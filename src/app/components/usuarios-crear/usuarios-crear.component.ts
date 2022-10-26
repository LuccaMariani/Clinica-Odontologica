import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { AutenticarService } from 'src/app/services/autenticar.service';
import { Administrador} from 'src/app/class/administrador';
import { BlockLike } from 'typescript';


@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.scss']
})
export class UsuariosCrearComponent implements OnInit {

  public selecRegistrarEspecialista: boolean;
  public selecRegistrarPaciente: boolean;
  public selecRegistrarAdmin: boolean;

  public selectedOption?: string;

  constructor(private readonly fb: FormBuilder, private usuarioService: UsuariosService, private auth: AutenticarService) { 
    this.selecRegistrarEspecialista = false;
    this.selecRegistrarPaciente = false;
    this.selecRegistrarAdmin = false;
  }

  ngOnInit(): void {
    
  }

  onChanges(){
    console.log(this.selectedOption);
  }
  actualizar(){
    console.log(this.selectedOption);
  }



}
