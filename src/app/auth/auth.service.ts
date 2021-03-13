import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/moddules/User';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private url = 'http://127.0.0.1:8000/api';
    private userData = new BehaviorSubject(null);
  constructor( private http: HttpClient) { }
  login(credentials : User): Observable<string> {
   return this.http.post<{token: string}>(`${this.url}/login`, credentials).pipe(
     map(response => response.token)
   )
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
