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


@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.scss']
})
export class RegisterEspecialistaComponent implements OnInit {

  public especialidadesBase: any[] = [];
  public registerEspecialistaForm!: FormGroup;

  public especialidadesSeleccionadas: Especialidades[] = [];
  public agregarEspecialidadSeleccionado: boolean;
  public foto: any;

  constructor(
    private readonly fb: FormBuilder,
    private usuarioService: UsuariosService,
    private auth: AutenticarService,
    private especialidadService: EspecialdadesService,
    private storageService: StorageService,
    private firestorage: AngularFireStorage) {
    this.agregarEspecialidadSeleccionado = false

  }

  ngOnInit(): void {

    this.especialidadService.getEspecialidades().subscribe(res => {
      res.
        forEach(esp => {
          this.especialidadesBase.push(esp);
        })
    });

    console.log(this.especialidadesBase);
    this.registerEspecialistaForm = this.initForm();
  }

  subirFoto(select: any) {
    this.foto = select.target.files[0];
  }

  verEspecialidades() {
    console.log('seleccionadas', this.especialidadesSeleccionadas);
    console.log('base', this.especialidadesBase);
  }

  onSubmit(): void {
    console.log('Form:', this.registerEspecialistaForm);
    this.Register();
  }

  onChangeEspecialidad($event: any) {
    console.log("1) onChangeEspecialidad >> especialidades.Seleccionadas: "+ this.especialidadesSeleccionadas);
    let especialidad: Especialidades = new Especialidades($event.target.value)
    if ($event.target.checked) {
      this.especialidadesSeleccionadas.push(especialidad)
    }
    else {
      const index = this.especialidadesSeleccionadas.indexOf(especialidad, 0);
      if (index > -1) {
        this.especialidadesSeleccionadas.splice(index, 1);
      }
      else {
        console.log('error', $event)
      }
    }
    console.log("2) onChangeEspecialidad >> especialidades.Seleccionadas: "+ this.especialidadesSeleccionadas[0],this.especialidadesSeleccionadas[1],this.especialidadesSeleccionadas[2]);
  }

  onChangeNuevaEspecialidad($event: any) {
    console.log("1) onChangeNuevaEspecialidad >> agregarEspecialidadSeleccionado: " + this.agregarEspecialidadSeleccionado);

    if (!this.agregarEspecialidadSeleccionado) {
      this.agregarEspecialidadSeleccionado = $event.target.value;
    } else {
      this.agregarEspecialidadSeleccionado = false;
    }

    console.log("2) onChangeNuevaEspecialidad >> agregarEspecialidadSeleccionado: " + this.agregarEspecialidadSeleccionado);
  }

  onChanges() {
    console.log('a');
    if (this.registerEspecialistaForm.get('especialidad')?.value == 'Agregar una especialidad') {
      console.log('b');
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
      nuevaEspecialidad: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],

      foto1: [null, [Validators.required]],
      /*
      foto2: ['', [Validators.required]]*/
    })
  }

  Register() {
    try {
      let especialidades = this.especialidadesSeleccionadas;
      let especialidadNueva = new Especialidades('');

      if (this.agregarEspecialidadSeleccionado) {

        especialidadNueva.especialidad = this.registerEspecialistaForm.get('nuevaEspecialidad')?.value;
        especialidades.push(especialidadNueva);
      }

      let especialista = new Especialista(
        this.registerEspecialistaForm.get('nombre')?.value,
        this.registerEspecialistaForm.get('apellido')?.value,
        this.registerEspecialistaForm.get('edad')?.value,
        this.registerEspecialistaForm.get('dni')?.value,
        especialidades,
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
              console.log('respuesta que se guarda en la fot del especialista', response)
              especialista.foto1 = response;

              if (user != null && response != null) {
                console.log("Se registro correctamente:", user)

                //se guarda el especialsita en la base
                this.usuarioService.guardarEspecialista(especialista);

                //habria que hacer ver si alguna de las especialidades no esta en la lista de especialidades, y agregarla
                if (this.agregarEspecialidadSeleccionado) {

                  this.especialidadService.guardarEspecialidadEnLaLista(especialidadNueva.especialidad);
                }
              }
              else {
                console.log("Error:", user)
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


