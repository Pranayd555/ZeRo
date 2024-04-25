import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/register/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loginService = this.injector.get(LoginServiceService);
    let token = loginService.getUserToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorisation: `${token}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
