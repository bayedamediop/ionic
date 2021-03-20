import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/moddules/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://127.0.0.1:8000/api/admin/users';
  private urlAnnuler = 'http://127.0.0.1:8000/api/admin/transaction'

 private user: User
  constructor( private http: HttpClient) { }
  getAllUsers(){
    return this.http.get(this.url)
  }
  addUser(users: FormData): any {
    return this.http.post(`${this.url}`,users);
  }
  getUserById(id: number): any {
    return this.http.get(`${this.url}/${id}`);
  }

  update(id: number, users: FormData): any {
    return this.http.put(`${this.url}/${id}`,users);
  }
  getAllProfils(): any {
    return this.http.get('http://127.0.0.1:8000/api/profils');
  }
  getAllAgences(): any {
    return this.http.get('http://127.0.0.1:8000/api/admin/agences');
  }
  annulerTransaction(code: number): any {
    return this.http.get(`${this.urlAnnuler}/${code}`);
  }
}

