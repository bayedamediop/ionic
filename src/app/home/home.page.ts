import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserService } from '../auth/user.service';
import {log} from "util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private http: HttpClient, private authservice: AuthService,
               private userService: UserService, private router: Router) { }
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
    this.idUserConnected = tokenDecoded.id;
     //console.log(this.idUserConnected);
    this.nameUserConnected = tokenDecoded.username;
    // console.log(this.nameUserConnected);
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
     //console.log(this.users);

      this.users.forEach((element: any) => {
        if (element.email === this.nameUserConnected) {
          console.log( this.solde=(element['agence']['compte'].solde));
            //this.solde=(element['agence']['compte'].solde);

          //console.log(this.idUserConnected),
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
  // logout() {
  //   if (confirm('Are you sure you want logout?')) {
  //     const token = localStorage.getItem('token') ;
  //     localStorage.clear();
  //     this.router.navigateByUrl('');
  //   }
  // }
  logout(){
    this.authservice.logout();
        this.router.navigateByUrl('');



  }

}
