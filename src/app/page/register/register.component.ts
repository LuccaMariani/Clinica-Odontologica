import { Component, OnInit } from '@angular/core';
import { MenuComponent } from 'src/app/components/menu/menu.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public paciente:boolean;
  public especialista:boolean;
  private menu:MenuComponent;
  
  constructor(private menuC:MenuComponent) { 
    this.menu = menuC;
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
