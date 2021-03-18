import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private http: HttpClient, private authservice: AuthService, private userService: UserService) { }
  token: any;
  nameUserConnected: string;
  nom: string;
  prenom: string;
  idUserConnected: any;
  imageUser: string;
  transaction: [];
  compte: [];
  photoExist = false;
  solde: string;
  users: any;
  helper = new JwtHelperService();

  ngOnInit(): void {
    this.token = this.authservice.getToken() ;
    const tokenDecoded = this.helper.decodeToken(this.token);
     // console.log(tokenDecoded);
    this.nameUserConnected = tokenDecoded.username;
    // console.log(this.nameUserConnected);
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
     //console.log(this.users);

      this.users.forEach((element: any) => {
        if (element.email === this.nameUserConnected) {
            this.solde=(element['agences'][0]['compte'].solde);
           this.idUserConnected = element.id;
           this.nom = element.nom;
           this.prenom = element.prenom;
           //this.user = element.transaction;
          //console.log(this.solde);
           if (element.avatar != null) {
            this.imageUser = element.avatar;
            this.photoExist = true;
           // console.log(this.imageUser);
            return;
          }
           return;
        }
      }) ;
    });
    // const tokenDecoded = this.helper.decodeToken(response.token) ;
  }

  // tslint:disable-next-line:typedef
  logout() {
    if (confirm('Are you sure you want logout?')) {
      const token = localStorage.getItem('token') ;
      localStorage.clear();
    }
  }

}
