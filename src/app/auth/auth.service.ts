import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/moddules/User';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
    private url = 'http://127.0.0.1:8000/api';
    private userData = new BehaviorSubject(null);
  constructor( private http: HttpClient, private router: Router) { }
  login(email: string, password: string): any{
    return this.http.post<any>( `${this.url}/login`, {
      email , password
    }).pipe(
      map((response: any ) => {
        const decoded = this.helper.decodeToken(response.token);
        console.log(decoded);
        localStorage.setItem('token', response.token);
        console.log(decoded.roles);
         if (decoded.roles[0] === 'ROLE_ADMIN') {
         this.router.navigateByUrl('/admin');
         }
        else {
          this.router.navigateByUrl('/tabs');

         }
          //else if (decoded.roles === 'ROLE_CM') {
        //   this.router.navigate(['users']);
        //   // this.router.navigate(['cm']);
        // }else if (decoded.roles === 'ROLE_APPRENANT') {
        //  // console.log('apprenant');
        //   // this.router.navigate(['apprenant']);
        // }
      })
    );
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    if ( token !== 'undefined'){
      return token;
    }else {
      return null;
    }
  }
  logout(): void{
    localStorage.removeItem('token');
  }
  getUser() {
    return this.userData.getValue();
  }
  getAllfrais() {
    return this.http.get(`${this.url}/admin/tarifs`)
  }
 
}
