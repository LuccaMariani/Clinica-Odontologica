import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AbstractControl } from '@angular/forms';

import { Especialista } from 'src/app/class/especialista';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { EspecialdadesService } from 'src/app/services/especialidades.service';

export class Especialidades {

  public especialidad: string;
  constructor(especialidad: string = '') {
    this.especialidad = especialidad;
  }
}


@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.scss']
})
export class RegisterEspecialistaComponent implements OnInit {

  public especialidades: any[] = [
  ];

  registerEspecialistaForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private usuarioService: UsuariosService, private auth: AutenticarService, private especialidadService: EspecialdadesService) {
  }

  ngOnInit(): void {

    this.especialidadService.getEspecialidades().subscribe(res => {
      res.
        forEach(esp => {
          this.especialidades.push(esp);
        })
    });
    
    console.log(this.especialidades);
    this.registerEspecialistaForm = this.initForm();
  }

  
  verEspecialidades() {

    console.log('hola', this.especialidades);
  }

  onSubmit(): void {
    console.log('Form:', this.registerEspecialistaForm);
    this.Register();
  }

  onChanges() {
    console.log('2');
    if (this.registerEspecialistaForm.get('especialidad')?.value == 'Agregar una especialidad') {
      console.log('1');
      this.registerEspecialistaForm.value.nuevaEspecialidad = '';
    }
  }

  initForm(): FormGroup {
    //declarar las propiedades del form con FormBuilder
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3),]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(5)]],
      dni: ['', [Validators.required, Validators.min(5)]],
      especialidad: ['', [Validators.required, Validators.minLength(3)]],
      nuevaEspecialidad: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      /*
      foto1: ['', [Validators.required]],
      foto2: ['', [Validators.required]]*/
    })
  }

  Register() {

    let especialidad = this.registerEspecialistaForm.get('especialidad')?.value;

    if (this.registerEspecialistaForm.get('especialidad')?.value == 'Agregar una especialidad') {
      especialidad = this.registerEspecialistaForm.get('nuevaEspecialidad')?.value;
    }

    let especialista = new Especialista(
      this.registerEspecialistaForm.get('nombre')?.value,
      this.registerEspecialistaForm.get('apellido')?.value,
      this.registerEspecialistaForm.get('edad')?.value,
      this.registerEspecialistaForm.get('dni')?.value,
      especialidad,
      this.registerEspecialistaForm.get('email')?.value,
      false
    );

    this.auth.register(especialista.email, this.registerEspecialistaForm.get('password')?.value)
      .then(res => {
        console.log("Se registro correctamente:", res)
        if (res != null) {
          this.usuarioService.guardarEspecialista(especialista);
          this.especialidadService.guardarEspecialidadEnLaLista(especialidad);
        }
      })
  }

  get validacion(): { [key: string]: AbstractControl } {
    return this.registerEspecialistaForm.controls;
  }

}
