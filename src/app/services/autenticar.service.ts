import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { textChangeRangeIsUnchanged } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  constructor(private afauth: AngularFireAuth) { }

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

  getUserLogged(){
    return this.afauth.authState;
  }

/*
  getUsuario(){
    return this.afauth.currentUser;
  }*/

  getMail()
  {
    console.log('ACAA',this.afauth.idToken);
    
    let respuesta = undefined;
    this.getUserLogged().subscribe(res=>{

      console.log('ACAA', res?.email)

      respuesta = res?.email;
    })

    return respuesta;
  }


  logout(){
    this.afauth.signOut();
  }
}
