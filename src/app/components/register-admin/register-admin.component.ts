import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { AutenticarService } from 'src/app/services/autenticar.service';
import { Administrador } from 'src/app/class/administrador';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {


  registerAdminForm!: FormGroup;
  public foto: any;
  constructor(private readonly fb: FormBuilder, private usuarioService: UsuariosService,
    private auth: AutenticarService,

    private firestorage: AngularFireStorage
  ) { }

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
      foto1: ['', [Validators.required]]
    })
  }

  subirFoto(select: any) {
    this.foto = select.target.files[0];
  }

  Register() {
    let admin = new Administrador(
      this.registerAdminForm.get('nombre')?.value,
      this.registerAdminForm.get('apellido')?.value,
      this.registerAdminForm.get('edad')?.value,
      this.registerAdminForm.get('dni')?.value,
      this.registerAdminForm.get('email')?.value
    );

    this.auth.register(admin.email, this.registerAdminForm.get('password')?.value).then(res => {

      let pathRef = 'fotos/' + admin.email + '_' + admin.nombre + '_1';
      const fileRef = this.firestorage.ref(pathRef);
      const task = this.firestorage.upload(pathRef, this.foto);

      task.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().toPromise().then(response => {

          admin.foto1 = response;

          console.log("Se registro correctamente:", res)
          if (res != null) {
            this.usuarioService.guardarAdmin(admin);
          }
        });
      });
    });
  }


  /*Register() {
    try {
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

      //this.storageService.guardarImagenes('especialista', this.registerEspecialistaForm.get('email')?.value, imagen).then(resImagenes => {
      this.auth.register(especialista.email, this.registerEspecialistaForm.get('password')?.value)
        .then(user => {

          let pathRef = 'fotos/' + especialista.email + '_' + especialista.nombre + '_1';
          const fileRef = this.firestorage.ref(pathRef);
          const task = this.firestorage.upload(pathRef, this.foto);

          task.snapshotChanges().toPromise().then(() => {
            fileRef.getDownloadURL().toPromise().then(response => {

              especialista.foto1 = response;

              if (user != null && response != null) {
                console.log("Se registro correctamente:", user)
                this.usuarioService.guardarEspecialista(especialista);
                this.especialidadService.guardarEspecialidadEnLaLista(especialidad);
              }
              else {
                console.log("Error:", user)
              }
            })
            //  })


          })
        })
    }
    catch (error) {
      console.log('ERROR hubo un problema al momentode registrar al especialsita');
    }
  }*/
} 
