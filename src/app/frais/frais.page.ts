import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../auth/transaction.service';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-frais',
  templateUrl: './frais.page.html',
  styleUrls: ['./frais.page.scss'],
})
export class FraisPage implements OnInit {
frais : any;
  errorMessage: any;
  constructor(private authService: TransactionService,private  alertController: AlertController) { }
  forms = new FormGroup({
    montant: new FormControl([Validators.required])
  })
  ngOnInit() {
  }
  async calculator (){

    console.log(this.forms.value);
   this.authService.frais(this.forms.value).subscribe(async data => {
     this.frais = data
       const alert = await this.alertController.create({
         cssClass: 'my-custom-class',
         header: 'Le frais de ce montant est :',
         message: this.frais ,
         buttons: ['Cancel']
       });
       await alert.present();
   }
   ,async err => {
       this.errorMessage=(err.error);
       const alert = await this.alertController.create({
         cssClass: 'my-custom-class',
         message: this.errorMessage ,
         buttons: ['Cancel']
       });
       await alert.present();
     })

  }
}
