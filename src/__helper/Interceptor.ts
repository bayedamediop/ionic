import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable()
export class Interceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {}
  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>{
    const token = this.authService.getToken();
    if (token ){
      request = request.clone({
        setHeaders: {
          Authorization : `Bearer ${token}`,
          ACCEPT: 'Application/json'
        }
      });
    }
    return next.handle(request);
  }
}
