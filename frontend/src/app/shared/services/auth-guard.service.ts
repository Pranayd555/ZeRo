import { Injectable, inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/register/login-service.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private loginService: LoginServiceService, public router: Router) { }

  CanActivate(): boolean {
    let user: User = new User();
    this.loginService.userObservable$.subscribe(
      data => {
        user = data;
      }
    )
    if(user.token) {
      return true;
    } else {
      this.router.navigate(['/user-register/login'])
      return false;
    }
  }

  
}

export const authGuard: CanActivateChildFn = (route, state) => {
  return inject(AuthGuardService).CanActivate();
}
