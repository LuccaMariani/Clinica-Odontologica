import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';

import { Paciente } from '../class/paciente';
import { Especialista } from '../class/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialdadesService {

  private ruta = 'especialidades';

  constructor(private firestore: AngularFirestore) {

  }

  getEspecialidades() {
    let collection = this.firestore.collection<any>(this.ruta)
    return collection.valueChanges();
  }

  guardarEspecialidadEnLaLista(especialidad: string) {
    console.log("especialidad a guardar:", especialidad);

    return this.firestore.collection(this.ruta).doc().set({
      especialidad
    });
  }

}
