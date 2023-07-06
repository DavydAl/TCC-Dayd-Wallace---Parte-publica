import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class PerfilGerencialGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const usuarioG: boolean = localStorage.getItem('usuarioG') !== null ? (localStorage.getItem('usuarioG') === 'true') : false;

    if (usuarioG) {
      return true;
    }

    // Redirecione para uma página de acesso negado ou qualquer outra ação que você deseja executar
    this.router.navigate(['/retirada']);
    return false; // Acesso negado à rota
  }

}
