import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Horario } from '../class/horario';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  horarioCollectionReference: any;
  horarios: Observable<Horario>;
  horariosArray : any = []; 

  constructor(private angularF : AngularFirestore) {
    this.horarioCollectionReference = this.angularF.collection<Horario>('horarios');
    this.horarios = this.horarioCollectionReference.valueChanges({idField : 'id'});

    this.traerHorarios().subscribe(value =>{
      this.horariosArray = value;
    });

   }
   traerHorarios()
   {
     return this.horarios;
   }
 
   agregarHorario(horario : Horario)
   {
     return this.horarioCollectionReference.add({...horario})
   }
 
   modificarHorario(horario : any, id : any)
   {
     return this.angularF.collection('horarios').doc(id).update({...horario});
   }

}
