import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

import { Turno } from '../interface/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private rutaTurnos = 'turnos'
  constructor(private firestore: AngularFirestore) {

  }

  getTurnos() {
    let collection = this.firestore.collection<any>(this.rutaTurnos)
    return collection.valueChanges();
  }

  
  getTurno(turno: Turno) {
    return this.firestore.collection(this.rutaTurnos).doc(turno.id).valueChanges();
  }

  guardarTurno(turno: Turno) {
    console.log("turno a guardar:", turno);
    return this.firestore.collection(this.rutaTurnos).doc(turno.id).set(turno);
  }

  modificarTurno(turno: Turno) {
    return this.firestore.collection('turnos').doc(turno.id).update(turno);
  }

  /*
   export interface Turno {
     id: string
     fecha: Date;
     especialidadNombre: string;
     pacienteMail: string;
     especialistMail: string;
     estado: EstadoTurno;
     comentario: string;
     encuesta: any;
   }
   export enum EstadoTurno {
       Pendiente = 'Pendiente',
       Cancelado = 'Cancelado',
       Rechazado = 'Rechazado',
       Aceptado = 'Aceptado',
       Realizado = 'Realizado',
   }

  */
}
