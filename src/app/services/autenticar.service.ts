import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  private esLogeado:any;


  constructor(private afauth: AngularFireAuth) { 


  }

  getEmail(){
    return this.esLogeado;
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

  async getUsuarioLogueado()
  {
    return await firstValueFrom(this.afauth.authState);
  }
  
  getUserLogged(){
    return this.afauth.authState;
  }

  setEmail()
  {
    this.getUserLogged().subscribe(res=>{
      this.esLogeado = res?.email;
    })
  }

  logout(){
    this.afauth.signOut();
  }
}
