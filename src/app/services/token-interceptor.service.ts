import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: any, next: any) {
    const autorizacion = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.obtenerToken()}`,
      },
    });

    return next.handle(autorizacion);
  }
}
