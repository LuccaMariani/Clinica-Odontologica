import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public paciente:boolean;
  public especialista:boolean;
  
  constructor() { 
    this.especialista = false;
    this.paciente = false;
  }

  ngOnInit(): void {
    
  }

  public selecPaciente(){
    this.especialista = false;
    this.paciente = true;
  }

  public selecEspecialista(){
    this.especialista = true;
    this.paciente = false;
  }

}
