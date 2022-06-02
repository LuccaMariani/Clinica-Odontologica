import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/class/paciente';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({  
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.scss']
})
export class RegisterPacienteComponent implements OnInit {

 
  registerPacienteForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private usuarioService: UsuariosService, private auth: AutenticarService) { }

  ngOnInit(): void {
    this.registerPacienteForm = this.initForm();
  }

  onSubmit(): void {
    console.log('Form:', this.registerPacienteForm);
    this.Register();
  }

  initForm(): FormGroup {
    //declarar las propiedades del form con FormBuilder
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3),]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(5)]],
      dni: ['', [Validators.required]],
      obraSocial: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      foto1: ['', [Validators.required]],
      foto2: ['', [Validators.required]]
    })
  }

  Register() {
    let paciente = new Paciente(
      this.registerPacienteForm.get('nombre')?.value,
      this.registerPacienteForm.get('apellido')?.value,
      this.registerPacienteForm.get('edad')?.value,
      this.registerPacienteForm.get('dni')?.value,
      this.registerPacienteForm.get('obraSocial')?.value,
      this.registerPacienteForm.get('email')?.value
    );

    this.auth.register(paciente.email, this.registerPacienteForm.get('password')?.value)
      .then(res => {
        console.log("Se registro correctamente:", res)
        if (res != null) {
          this.usuarioService.guardarPaciente(paciente);
        }
      })
  }


}
