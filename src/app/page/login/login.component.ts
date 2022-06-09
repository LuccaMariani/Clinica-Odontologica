import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/class/paciente';
import { AutenticarService } from 'src/app/services/autenticar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  private email: string;
  constructor(private readonly fb: FormBuilder, private usuarioService: UsuariosService, private auth: AutenticarService) { 
    this.email = '';
  }
  
  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  onSubmit(): void {
    console.log('Form:', this.loginForm);
    this.Login();
  }

  initForm(): FormGroup {
    //declarar las propiedades del form con FormBuilder
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  Login() {
    console.log(this.loginForm.get('email')?.value);
    console.log(this.loginForm.get('password')?.value);
    this.auth.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .then(res => {
        this.email = this.loginForm.get('email')?.value

      })
  }

}
