
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Injectable({ 
  providedIn: 'any'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
   // form: FormGroup;
    email: string;
    password: string
  constructor( private authService:
     AuthService,
     private router: Router,
     private alertCtrl: AlertController,
     private loadingctrl: LoadingController

     ) { }

     formulaire = new FormGroup({
     email: new FormControl('',[Validators.required]),

     password: new FormControl('',[Validators.required]) 
  });
  async onSubmit() {
  
    this.authService.login(this.formulaire.value).subscribe(
      async (data) => {
        localStorage.setItem('token',data);
        
        this.router.navigateByUrl('/tabs');
      }
    ),
    async () =>{
      const alert = await this.alertCtrl.create({message: 'login Failed',buttons: ['OK']});
      await alert.present();
     
    }
  }

}
