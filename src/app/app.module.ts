import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { RegisterPacienteComponent } from './components/register-paciente/register-paciente.component';
import { RegisterEspecialistaComponent } from './components/register-especialista/register-especialista.component';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { UsuariosInformacionComponent } from './components/usuarios-informacion/usuarios-informacion.component';
import { UsuariosCrearComponent } from './components/usuarios-crear/usuarios-crear.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPacienteComponent,
    RegisterEspecialistaComponent,
    UsuariosComponent,
    UsuariosInformacionComponent,
    UsuariosCrearComponent,
    RegisterAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
