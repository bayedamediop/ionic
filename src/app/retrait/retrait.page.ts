import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../auth/transaction.service';
import { Transaction } from 'src/moddules/Transactions';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  private activeBeneficier = false;
  private activeEmeteur = true;
  private activeCode = true;
  private activeFormulaires = false;
  user = null;
  errorMessage: any;
  transaction: any;
  clientEnvoie: any;
  client_recu: any;

  segmentChanged(ev: any) {
   if (ev.detail.value == 'beneficher'){
              this.activeBeneficier = true;
              this.activeEmeteur = false;

   }else{
     this.activeBeneficier = false;
     this.activeEmeteur=true;
   }
  }
  suivant(){
    this.activeBeneficier = true;
    this.activeEmeteur = false;
  }
  constructor( private authService: TransactionService,
private loadingCtrl: LoadingController,
     private alertCtrl: AlertController) { }
  firstFormGroup: FormGroup;
  formulaire: FormGroup;

  ngOnInit() {

  }
  recherge = new FormGroup({
    code: new FormControl('',[Validators.required])
  })
  recherger(){
  this.activeCode = true;
  this.activeFormulaires= false;
    this.authService.getTransactionBycODE(this.recherge.value.code).subscribe(data => {
      this.transaction = data;
      this.activeCode = false;
        this.activeFormulaires= true;
       this.clientEnvoie=(this.transaction['clientEnvoie']);
      this.client_recu= this.transaction['clientRecu'];

    }, err => {
    this.errorMessage=(err.error);
    }
    )
  }

formTerminer = new FormGroup({
    cni: new FormControl('',[Validators.required])
  })
  async onSubmit() {
      
       const loading = await this.loadingCtrl.create({
        message:'Please wait ...'
      });
      //console.log('oji');
      
      const alert = await this.alertCtrl.create({
              cssClass: "my-custom-class",
              message: "Vous Voullez retiret cete transaction ",
             
              buttons: [
                {
                  text: 'Cancel',
                  handler: () =>{
                    buttons: ['OK']
                  }
              }, 
              {
                text: 'Confirmer',
                handler: () =>{
                  //await loading.present();
                  this.authService.retrait(this.recherge.value.code,this.formTerminer.value) .subscribe (
                    async (data) => {
                     await  loading.dismiss();
                      const alert = await this.alertCtrl.create({
                        header: 'Succe',
                        cssClass: "my-custom-class",
                        message: "Success!! ",
                        buttons: ['OK']
                  
                      });
                      await alert.present();
                    }, async (erreur) => {
                      await loading.dismiss();
                      const alert = await this.alertCtrl.create({
                        header: 'Failed',
                        cssClass: "my-custom-class",
                        message: erreur.error,
                        buttons: ['OK']
                      });
                      await alert.present();
                      console.log (erreur);
                    });
                }
              }
            ]
            });
            await alert.present();
    
    
    }
}
