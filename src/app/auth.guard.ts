import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSessionService } from './shared/user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioSession: UserSessionService,
    private router: Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const authenticated =  this.usuarioSession.isAuthenticated(state.url);
    if(authenticated){
      return true;
    }else{
      this.router.navigate(['/login'])
    }
  }
  
}
