import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  public miUsuario: any;

  private esLogeado: any;
  public usuarioLogueado: any = "";
  public currentUser: any = null;

  constructor(
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore
    ) {

    this.obtenerUsuarioDatos();
  }

  async getMiUsuario() {
    return await this.usuarioLogueado;
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error en login: ', error);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error en register: ', error);
      return null;
    }
  }

  async getUsuarioLogueado() {
    return await firstValueFrom(this.afauth.authState);
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  logout() {
    this.usuarioLogueado = null;
    this.currentUser = null;
    this.afauth.signOut();
  }

  /////////////////////////////////////
  //  CAMBIAR ESTO

  obtenerUsuarioDatos() {
    this.getUserLogged().subscribe(userLogged => {
      this.obtenerTodos("paciente").subscribe(i => {
        i.forEach(user => {
          if (user.email == userLogged?.email) {
            this.usuarioLogueado = user
          }
        })
      })
      this.obtenerTodos("especialista").subscribe(i => {
        i.forEach(user => {
          if (user.email == userLogged?.email) {
            this.usuarioLogueado = user
          }
        })
      })

      this.obtenerTodos("administradores").subscribe(i => {
        i.forEach(user => {
          if (user.email == userLogged?.email) {
            this.usuarioLogueado = user
          }
        })
      })
    })
    return this.usuarioLogueado;
  }

  obtenerTodos(nombreColeccion: string) {
    let collection = this.firestore.collection<any>(nombreColeccion)
    return collection.valueChanges();
  }
}


