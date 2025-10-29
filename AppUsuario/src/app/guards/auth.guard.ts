import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isAuthenticated = !!localStorage.getItem('userId'); // Verifica si el usuario está autenticado
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
    }
    return isAuthenticated;
  }
}
