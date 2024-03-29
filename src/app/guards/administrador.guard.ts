import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticarService } from '../services/autenticar.service';
import { MenuComponent } from '../components/menu/menu.component';
import { GuardsService } from '../services/guards.service';
@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate, CanLoad {

  private esLogeado: any;
  public usuarioLogueado: string = "";

  constructor(private guardSV:GuardsService, private menu:MenuComponent, private autenticarService: AutenticarService, private usuariosService: AutenticarService) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log('guard', this.guardSV.getTipoUsuario());


    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
