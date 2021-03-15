import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../auth/transaction.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  private selected : string = 'emeteur';
  private activeBeneficier = false;
  private activeEmeteur = true;
  user = null;
  segmentChanged(ev: any) {
   if (ev.detail.value == 'beneficher'){
              this.activeBeneficier = true;
              this.activeEmeteur = false;
              console.log('Beneficier');
              
   }else{
     this.activeBeneficier = false;
     this.activeEmeteur=true;
     console.log('emeteur');
     
   }
  }
  suivant(){
    this.activeBeneficier = true;
    this.activeEmeteur = false;
  }
  constructor( private authService: AuthService , 
    private fb: FormBuilder, private userService: UserService,
    private loadingCtrl: LoadingController,
    private transaction: TransactionService, private alertCtrl: AlertController) { }
  token: any;
  nameUserConnected: string;
  nom: string;
  prenom: string;
  idUserConnected: any;
  idCompte: any;
  users: any;
  solde: any;
  frai: any;
  helper = new JwtHelperService(); ;
 ngOnInit(): void {
  }

  formulaire = new FormGroup({
    client: new FormGroup({ cni: new FormControl('1750 2010 039746',[Validators.required]),
    nomComplet: new FormControl('lo ndaye',[Validators.required]) ,
    phone: new FormControl('775657642',[Validators.required])
   }),
   client_recu: new FormGroup({ 
    nomComplet: new FormControl('lo fatou',[Validators.required]) ,
    phone: new FormControl('764553709',[Validators.required]) ,
   }),
    montant: new FormControl(10000,[Validators.required]),
    
 });

  
 
  async onSubmit() {
  const loading = await this.loadingCtrl.create({
    message:'Please wait ...'
  });
  //console.log('oji');
  
  const alert = await this.alertCtrl.create({
          cssClass: "my-custom-class",
          message: "Vous Voullez faire une transaction de ",
          inputs: [
            {type: "text", value: this.formulaire.value.montant},
            {type: "text", value: this.formulaire.value.client_recu.nomComplet},
  
          ],
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
              this.transaction.addTransaction(this.formulaire.value) .subscribe (
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
