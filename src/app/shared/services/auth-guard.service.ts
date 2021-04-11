import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnDestroy {
  subscription: Subscription;
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!localStorage.getItem('id_user')) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
