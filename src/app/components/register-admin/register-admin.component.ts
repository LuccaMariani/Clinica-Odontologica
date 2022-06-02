import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { AutenticarService } from 'src/app/services/autenticar.service';
import { Administrador } from 'src/app/class/administrador';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

 
  registerAdminForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private usuarioService: UsuariosService, private auth: AutenticarService) { }

  ngOnInit(): void {
    this.registerAdminForm = this.initForm();
  }

  onSubmit(): void {
    console.log('Form:', this.registerAdminForm);
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
    let admin = new Administrador(
      this.registerAdminForm.get('nombre')?.value,
      this.registerAdminForm.get('apellido')?.value,
      this.registerAdminForm.get('edad')?.value,
      this.registerAdminForm.get('dni')?.value,
      this.registerAdminForm.get('email')?.value
    );

    this.auth.register(admin.email, this.registerAdminForm.get('password')?.value)
      .then(res => {
        console.log("Se registro correctamente:", res)
        if (res != null) {
          this.usuarioService.guardarAdmin(admin);
        }
      })
  }

}
