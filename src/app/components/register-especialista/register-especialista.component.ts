import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AbstractControl } from '@angular/forms';

import { Especialista } from 'src/app/class/especialista';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { EspecialdadesService } from 'src/app/services/especialidades.service';
import { StorageService } from 'src/app/services/storage.service';
import { async } from '@angular/core/testing';
//import Swal from 'sweetalert2';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Especialidad } from 'src/app/interface/especialidad';

import { Especialidades } from 'src/app/class/especialidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.scss']
})
export class RegisterEspecialistaComponent implements OnInit {

  public especialidadesBase: any[] = [];
  public registerEspecialistaForm!: FormGroup;
  private especialidadesBaseAgregar:string[] = [];
  public especialidadesSeleccionadas: string[] = [];
  //public agregarEspecialidadSeleccionado: boolean;
  public foto: any;

  //
  public especialidadNueva: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private usuarioService: UsuariosService,
    private auth: AutenticarService,
    private especialidadService: EspecialdadesService,
    //private storageService: StorageService,
    private firestorage: AngularFireStorage,
    private ruteo: Router) {
    //this.agregarEspecialidadSeleccionado = false

    this.especialidadService.getEspecialidades().subscribe(res => {
      res.
        forEach(esp => {
          this.especialidadesBase.push(esp);
        })
    });

  }

  ngOnInit(): void {
    console.log(this.especialidadesBase);
    this.registerEspecialistaForm = this.initForm();
  }

  subirFoto(select: any) {
    this.foto = select.target.files[0];
  }

  verEspecialidades() {
    console.log('especialidadesSeleccionadas', this.especialidadesSeleccionadas);
    console.log('especialidadesBase', this.especialidadesBase);
    console.log('especialidadNueva', this.especialidadNueva);
  }

  agregarEspecialidadNueva() {
    if(this.registerEspecialistaForm.get('especialidadNueva')?.value != '' ){
      let especialidadNuevaAgregar = this.registerEspecialistaForm.get('especialidadNueva')?.value;
      this.registerEspecialistaForm.get('especialidadNueva')?.setValue('');

      this.especialidadesBaseAgregar.push(especialidadNuevaAgregar)
      this.especialidadesBase.push({ especialidad: especialidadNuevaAgregar })
    }

  }

  onSubmit(): void {
    console.log('Form:', this.registerEspecialistaForm);
    this.Register();
  }

  onChangeEspecialidad($event: any) {
    //console.log("1) onChangeEspecialidad >> especialidades.Seleccionadas: "+ this.especialidadesSeleccionadas[0],this.especialidadesSeleccionadas[1],this.especialidadesSeleccionadas[2]);

    console.log('lo que puedo leer', $event.target.value);
    let especialidad = $event.target.value;

    if ($event.target.checked) {
      // si ESTA cheked el cuadrado, se agrega a la lista de especialidades seleccionadas
      this.especialidadesSeleccionadas.push(especialidad)
    }
    else {
      // si NO cheked el cuadrado, se busca en que cuadro esta guardada, y se elimina de la lista de especialidades seleccionadas
      const index = this.especialidadesSeleccionadas.indexOf(especialidad, 0);
      console.log('index de la especialidad seleccionada', index);
      if (index !== -1) {
        this.especialidadesSeleccionadas.splice(index, 1);
      }
      else {
        console.log('error', $event)
      }
    }
    console.log("2) onChangeEspecialidad >> especialidades.Seleccionadas: " + this.especialidadesSeleccionadas[0], this.especialidadesSeleccionadas[1], this.especialidadesSeleccionadas[2]);
  }

  /*
  onChangeNuevaEspecialidad($event: any) {
    console.log("1) onChangeNuevaEspecialidad >> agregarEspecialidadSeleccionado: " + this.agregarEspecialidadSeleccionado);

    if (!this.agregarEspecialidadSeleccionado) {
      this.agregarEspecialidadSeleccionado = $event.target.value;
    } else {
      this.agregarEspecialidadSeleccionado = false;
    }

    console.log("2) onChangeNuevaEspecialidad >> agregarEspecialidadSeleccionado: " + this.agregarEspecialidadSeleccionado);
  }
  */

  /*
  onChanges() {
    console.log('a');
    if (this.registerEspecialistaForm.get('especialidad')?.value == 'Agregar una especialidad') {
      console.log('b');
      this.registerEspecialistaForm.value.nuevaEspecialidad = '';
    }
  }
  */

  initForm(): FormGroup {
    //declarar las propiedades del form con FormBuilder
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3),]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      dni: ['', [Validators.required, Validators.min(10000000)]],
      nuevaEspecialidad: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      especialidadNueva: ['', []],
      foto1: [null, [Validators.required]],
      /*
      foto2: ['', [Validators.required]]
      */
    })
  }

  Register() {
    try {
      let especialidades: Especialidades[] = []

      this.especialidadesSeleccionadas.forEach(especialidad => {
        let esp = new Especialidades(especialidad)
        especialidades.push(esp)
      });

      /*
        if (this.agregarEspecialidadSeleccionado) {

          especialidadNueva.especialidad = this.registerEspecialistaForm.get('nuevaEspecialidad')?.value;
          especialidades.push(especialidadNueva.especialidad);
        }
      */
      let especialista = new Especialista(
        this.registerEspecialistaForm.get('nombre')?.value,
        this.registerEspecialistaForm.get('apellido')?.value,
        this.registerEspecialistaForm.get('edad')?.value,
        this.registerEspecialistaForm.get('dni')?.value,
        especialidades,
        this.registerEspecialistaForm.get('email')?.value,
        false
      );

      console.log('especialsita a guardarrrr', especialista)
      //this.storageService.guardarImagenes('especialista', this.registerEspecialistaForm.get('email')?.value, imagen).then(resImagenes => {
      this.auth.register(especialista.email, this.registerEspecialistaForm.get('password')?.value)
        .then(user => {

          let pathRef = 'fotos/' + especialista.email + '_' + especialista.nombre + '_1';
          const fileRef = this.firestorage.ref(pathRef);
          const task = this.firestorage.upload(pathRef, this.foto);

          task.snapshotChanges().toPromise().then(() => {
            fileRef.getDownloadURL().toPromise().then(response => {
              console.log('respuesta que se guarda en la fot del especialista', response)
              especialista.foto1 = response;

              if (user != null && response != null) {
                console.log("Se registro correctamente:", user)

                //se guarda el especialsita en la base
                console.log('respuesta del service al guardar especialista', this.usuarioService.guardarEspecialista(especialista));

                //habria que hacer ver si alguna de las especialidades no esta en la lista de especialidades, y agregarla

                  //ARREGLAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  //this.especialidadService.guardarEspecialidadEnLaLista(especialidadNueva.especialidad);

                this.ruteo.navigateByUrl("mi_perfil");
              }
              else {
                console.log("ERROR, hubo un error al momentode registrar al especialsita :", user)
              }
            })
          })
        })
    }
    catch (error) {
      console.log('ERROR hubo un problema al momentode registrar al especialsita');
    }
  }

}


