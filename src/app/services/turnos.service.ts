import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

import { Turno } from '../interface/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  turnoCollectionReference: any;
  turnos: Observable<Turno>;
  turnosArray : any = [];

  constructor(private firestore:AngularFirestore) { 
    this.turnoCollectionReference = this.firestore.collection('turnos');
    this.turnos = this.turnoCollectionReference.valueChanges({idField : 'id'});
    this.getTurnos().subscribe(turnos =>{
      this.turnosArray = turnos;
    });
   }
  
   // Cambiar cosas
   getTurnos()
   {
     return this.turnos;
   }
 
   agregarTurno(turno : Turno)
   {
     return this.turnoCollectionReference.add({...turno});
   }
 
   modificarTurno(turno : any, id : any)
   {
     return this.firestore.collection('turnos').doc(id).update(turno);
   }
}
