import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/class/paciente';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.scss']
})
export class RegisterPacienteComponent implements OnInit {


  public registerPacienteForm!: FormGroup;

  public foto1: any;
  public foto2: any;

  constructor(private readonly fb: FormBuilder,
    private usuarioService: UsuariosService,
    private auth: AutenticarService,
    private firestorage: AngularFireStorage) { }

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

  subirFoto1(select: any) {
    this.foto1 = select.target.files[0];
  }

  subirFoto2(select: any) {
    this.foto2 = select.target.files[0];
  }

  Register() {
    try {
      let paciente = new Paciente(
        this.registerPacienteForm.get('nombre')?.value,
        this.registerPacienteForm.get('apellido')?.value,
        this.registerPacienteForm.get('edad')?.value,
        this.registerPacienteForm.get('dni')?.value,
        this.registerPacienteForm.get('obraSocial')?.value,
        this.registerPacienteForm.get('email')?.value
      );

      let imagen: any[] = [];
      imagen[0] = this.registerPacienteForm.get('foto1');
      imagen[1] = this.registerPacienteForm.get('foto2');

      this.auth.register(paciente.email, this.registerPacienteForm.get('password')?.value).then(res => {

        let pathRef = 'fotos/' + paciente.email + '_' + paciente.nombre + '_1';
        const fileRef = this.firestorage.ref(pathRef);
        const task = this.firestorage.upload(pathRef, this.foto1);

        task.snapshotChanges().toPromise().then(() => {
          fileRef.getDownloadURL().toPromise().then(response => {

            let pathRef2 = 'fotos/' + paciente.email + '_' + paciente.nombre + '_2';
            const fileRef2 = this.firestorage.ref(pathRef2);
            const task2 = this.firestorage.upload(pathRef2, this.foto2);

            task2.snapshotChanges().toPromise().then(() => {
              fileRef2.getDownloadURL().toPromise().then(response2 => {

                paciente.foto1 = response;
                paciente.foto2 = response2;

                console.log("Se registro correctamente?", res)
                if (res != null) {
                  this.usuarioService.guardarPaciente(paciente).then(() => {
                    //this.router.navigate(['/bienvenida']);
                  });

                }
              })
            })
          })
        })
      })
    }
    catch (error) {
      console.log('ERROR hubo un problema al momentode registrarse');
    }
  }

}
