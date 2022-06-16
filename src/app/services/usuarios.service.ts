import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore';

import { Paciente } from '../class/paciente';
import { Especialista } from '../class/especialista';
import { Administrador } from '../class/administrador';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
  private rutaPaciente = 'paciente';
  private rutaEspecialista = 'especialista';
  private rutaAdmin = 'administradores'

  constructor(private firestore: AngularFirestore) {
  }

  //-- PACIENTES --------------------------------------
  getPacientes() {
    let collection = this.firestore.collection<any>(this.rutaPaciente)
    return collection.valueChanges();
  }

  getPaciente(paciente: any) {
    return this.firestore.collection(this.rutaPaciente).doc(paciente.email).valueChanges();
  }

  guardarPaciente(paciente: Paciente) {
    console.log("paciente a guardar:", paciente);
    return this.firestore.collection(this.rutaPaciente).doc(paciente.email).set({
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      edad: paciente.edad,
      dni: paciente.dni,
      obraSocial: paciente.obraSocial,
      email: paciente.email,
      foto1: paciente.foto1,
      foto2: paciente.foto2
    });
  }

  //-- ESPECIALISTAS --------------------------------------
  getEspecialistas() {
    let collection = this.firestore.collection<any>(this.rutaEspecialista)
    return collection.valueChanges();
  }

  getEspecialista(especialista: any) {
    return this.firestore.collection(this.rutaEspecialista).doc(especialista.email).valueChanges();
  }

  guardarEspecialista(especialista: Especialista) {
    console.log("especialista a guardar:", especialista);
    return this.firestore.collection(this.rutaEspecialista).doc(especialista.email).set({
      nombre: especialista.nombre,
      apellido: especialista.apellido,
      edad: especialista.edad,
      dni: especialista.dni,
      especialidad: especialista.especialidad,
      email: especialista.email,
      habilitado: especialista.habilitado,
      foto1: especialista.foto1
    });
  }

  async modificarEspecialista(email: any, especialista: Especialista) {
    try {
      return await this.firestore.collection(this.rutaEspecialista).doc(email).update(especialista);
    } catch (error) {
      console.log("Error en update especialista ", error)
    }
  }

  //-- ADMINISTRADORES -----------
  guardarAdmin(admin: Administrador) {
    console.log("admin a guardar:", admin);
    return this.firestore.collection(this.rutaAdmin).doc(admin.email).set({
      nombre: admin.nombre,
      apellido: admin.apellido,
      edad: admin.edad,
      dni: admin.dni,
      email: admin.email,
      habilitado: admin.habilitado,
      foto1: admin.foto1
    
    });
  }

  getAdmin(admin: any) {
    return this.firestore.collection(this.rutaAdmin).doc(admin.email).valueChanges();
  }

  getAdmins() {
    let collection = this.firestore.collection<any>(this.rutaAdmin)
    return collection.valueChanges();
  }


  //GENERICOS
  public setData(collection: string, documentId: string, data: any) {
    return this.firestore.collection(collection).doc(documentId).set(data);
  }
}
