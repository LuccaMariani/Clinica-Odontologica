import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AngularFireModule } from '@angular/fire/compat';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { StorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import { environment } from 'src/environments/environment';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//PAGE
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { ExtraInformacionComponent } from './page/extra-informacion/extra-informacion.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';

//COMPONENTS
import { MenuComponent } from './components/menu/menu.component';
import { RegisterPacienteComponent } from './components/register-paciente/register-paciente.component';
import { RegisterEspecialistaComponent } from './components/register-especialista/register-especialista.component';
import { UsuariosInformacionComponent } from './components/usuarios-informacion/usuarios-informacion.component';
import { UsuariosCrearComponent } from './components/usuarios-crear/usuarios-crear.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { HomeListadoUsuariosComponent } from './components/home-listado-usuarios/home-listado-usuarios.component';
import { MisTurnosComponent } from './page/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './page/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './page/mi-perfil/mi-perfil.component';
import { MisTurnosPacienteComponent } from './components/mis-turnos-paciente/mis-turnos-paciente.component';
import { MisTurnosEspecialistaComponent } from './components/mis-turnos-especialista/mis-turnos-especialista.component';
//
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


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
    RegisterAdminComponent,
    ExtraInformacionComponent,
    HomeListadoUsuariosComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    MisTurnosPacienteComponent,
    MisTurnosEspecialistaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    FormsModule,
    ReactiveFormsModule,
    StorageModule,
    // NgbModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    StorageModule,
    MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
