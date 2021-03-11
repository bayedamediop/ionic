import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/moddules/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://127.0.0.1:8000/api/admin/users';
 private user: User
  constructor( private http: HttpClient) { }
  getAllUsers(){
    return this.http.get(this.url)
  }
  addUser(user: User): any {
    return this.http.post(`${this.url}}`,user);
  }
}

