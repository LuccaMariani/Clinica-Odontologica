import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticarService } from '../services/autenticar.service';
import { MenuComponent } from '../components/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate, CanDeactivate<unknown>, CanLoad {

  private esLogeado: any;
  public usuarioLogueado: string = "";

  constructor(private menu:MenuComponent, private autenticarService: AutenticarService, private usuariosService: AutenticarService) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

    this.autenticarService.getUsuarioLogueado().then((res) => {
      console.log(res?.email);
      this.usuarioLogueado = res?.email?.toString() ?? '';
    })

    setTimeout(() => 
    {
      console.log('guard',this.menu.getTipoUsuario());
    },
    5000);

    


    return true;
  }


  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
