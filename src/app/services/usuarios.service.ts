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
      especialidades: especialista.especialidades,
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
  public setDocumentoGenerico(collection: string, documentId: string, data: any) {
    return this.firestore.collection(collection).doc(documentId).set(data);
  }

  public getUsuarios() {

    return
  }

  public getUsuario(email: string) {
    /*
        let admins = this.firestore.collection<any>(this.rutaAdmin)
        let especialsitas = this.firestore.collection<any>(this.rutaEspecialista)
        let pacientes = this.firestore.collection<any>(this.rutaPaciente)
    
        admins.add(especialsitas);
        admins.add(pacientes);
    
        return admins.doc(email).valueChanges(); */
  }


  /*

  getTipoUsuario(): usuario {
    let tipoUsuario: usuario = usuario.desconocido;

    this.listaAdmins?.forEach(admin => {
      console.log('casi entro admins', admin.email);
      if (admin.email == this.usuarioLogueado) {
        console.log('entro admins');
        tipoUsuario = usuario.admin;
      }
    });

    if (tipoUsuario == usuario.desconocido) {
      this.listaEspecialistas?.forEach(espe => {
        console.log('casi entro especialsitas', espe.email);
        if (espe.email == this.usuarioLogueado) {
          console.log('entro especialsitas');
          tipoUsuario = usuario.especialista;
        }
      });
      if (tipoUsuario == usuario.desconocido) {
        this.listaPacientes?.forEach(paci => {
          console.log('casi entro pacientes', paci.email);
          if (paci.email == this.usuarioLogueado) {
            console.log('entro pacientes');
            tipoUsuario = usuario.paciente;
          }
        });
      }
    }

    return tipoUsuario;
  }*/
}
