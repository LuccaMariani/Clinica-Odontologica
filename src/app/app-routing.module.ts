import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { UsuariosComponent} from './page/usuarios/usuarios.component';
import { AdministradorGuard } from './guards/administrador.guard';
import { ExtraInformacionComponent } from './page/extra-informacion/extra-informacion.component';
import { MisTurnosComponent } from './page/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './page/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './page/mi-perfil/mi-perfil.component';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mis_turnos', component: MisTurnosComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AdministradorGuard] },
  { path: 'mas_informacion', component: ExtraInformacionComponent },
  { path: 'mi_perfil', component: MiPerfilComponent },
  { path: 'solicitar_turno', component: SolicitarTurnoComponent },
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
