import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

import { Turno } from '../interface/turno';
//
import { getFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import * as firebase from 'firebase/compat';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {


  private rutaTurnos = 'turnos';

  private Turnos?: AngularFirestoreCollection<any>;
  private Turnos2?: AngularFirestoreCollection<any>;

  public turnos: any[] = [];

  promiseTurnos: Subscription = new Subscription;


  constructor(private toastr: ToastrService, public afAuth: AngularFireAuth, public afs: AngularFirestore, private router: Router) {
    this.traerTurnos()
  }

  async agregarTurno(turno: any) {
    let uid = this.afs.createId()
    turno.uid = uid
    await this.afs.collection(this.rutaTurnos).doc(uid).set(turno).catch((err) => {
      this.toastr.error("Ocurrio un error al reservar el turno", 'Error')

    }).then(() => {
      this.toastr.success("El truno fue reservado")
    })

  }

  traerTurnos() {

    this.turnos = []
    this.Turnos = this.afs.collection(this.rutaTurnos)
    this.promiseTurnos = this.Turnos.valueChanges().subscribe((esp: any) => {
      this.turnos = esp
    })
  }

  getTurnos() {
    let collection = this.afs.collection<any>(this.rutaTurnos)
    return collection.valueChanges();
  }

  desSubscribir() {
    this.promiseTurnos.unsubscribe()
  }

  async cancelar(turno: any, razon: string) {
    await this.afs.collection(this.rutaTurnos).doc(turno.uid).update({ estado: "cancelado", razon_cancelacion: razon }).catch((err) => {
      this.toastr.error("Ocurrio un error al cancelar!", 'Error')
    }).finally(() => {
      this.toastr.success("Turno cancelado!", 'Exito');
    })
  }


  async rechazar(turno: any) {
    await this.afs.collection(this.rutaTurnos).doc(turno.uid).update({ estado: "rechazado" }).catch((err) => {
      this.toastr.error("Ocurrio un error al rechazar!", 'Error')
    }).finally(() => {
      this.toastr.success("Turno rechazado!", 'Exito');
    })
  }


  async aceptar(turno: any) {
    await this.afs.collection(this.rutaTurnos).doc(turno.uid).update({ estado: "aceptado" }).catch((err) => {
      this.toastr.error("Ocurrio un error al aceptar!", 'Error')
    }).finally(() => {
      this.toastr.success("Turno aceptado!", 'Exito');
    })
  }

  async finalizar(turno: any, comentario: string, diagnostico: string, historial: any) {
    await this.afs.collection(this.rutaTurnos).doc(turno.uid).update({

      estado: "finalizado",
      comentario_especialista: comentario,
      diagnostico: diagnostico,
      historial: historial

    }).catch((err) => {
      this.toastr.error("Ocurrio un error al finalizar!", 'Error')
    }).finally(() => {
      this.toastr.success("Turno finalizado!", 'Exito');
    })
  }

  traerTurnosSus() {
    const coleccion = this.afs.collection('usuarios');
    return coleccion.valueChanges();
  }

  async calificar(turno: any, comentario: string) {
    await this.afs.collection(this.rutaTurnos).doc(turno.uid).update({
      comentario_usuario: comentario
    }).catch((err) => {
      this.toastr.error("Ocurrio un error al calificar!", 'Error')
    }).finally(() => {
      this.toastr.success("Turno calificado!", 'Exito');
    })
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



  /*
VIEJOOOOOO

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

*/

}
