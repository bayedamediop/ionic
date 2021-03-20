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
  activeBeneficier = false;
  activeEmeteur = true;
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
    this.isSubmitted = true;
    this.activeBeneficier = true;
    this.activeEmeteur = false;
  }
  constructor( private authService: AuthService ,
    private fb: FormBuilder, private userService: UserService,
    private loadingCtrl: LoadingController,
    private transaction: TransactionService,
               private alertCtrl: AlertController) { }
  token: any;
  nameUserConnected: string;
  isSubmitted = false;
  nom: string;
  prenom: string;
  idUserConnected: any;
  idCompte: any;
  frair: any;
  motanaTotal: any;
  users: any;
  solde: any;
  frais: any;
  helper = new JwtHelperService();
  montant= '';
 ngOnInit(): void {

 }

  calculer($event: KeyboardEvent){
   const sommeMontant = {montant: Number( this.montant)}
   //console.log(sommeMontant);
   //console.log(this.transaction.frais(this.formulaire.value.montant))
   this.transaction.frais(sommeMontant).subscribe( data =>{
     this.frais = data;
    this.motanaTotal = +this.frais + (+Number( this.montant));
    // console.log(this.frais)
    // console.log(this.motanaTotal)
   })
 }
  get errorControl() {
    return this.formulaire.controls;
  }

  formulaire = new FormGroup({
    client: new FormGroup({ cni: new FormControl('',
        [Validators.pattern('^[0-9]+$'),Validators.required]),
    nomComplet: new FormControl('',[Validators.required]) ,
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
   }),
   client_recu: new FormGroup({
    nomComplet: new FormControl('',[Validators.required]) ,
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]) ,
   }),
    montant: new FormControl('',[Validators.required]),

 });
  private EMETTEUR: string

  async onSubmit() {
    this.isSubmitted = true;
  const loading = await this.loadingCtrl.create({
    message:'Please wait ...'
  });
    //await alert.present();

  const alert = await this.alertCtrl.create({
          cssClass: "my-custom-class",
          header: `<div>Cofirmation</div>`,
          message: `<div style="width: 300px; border-radius: 40%">EMETTEUR <br> NomCpmlet <strong>${this.formulaire.value.client.nomComplet}</strong><br>
                                N°CNI  <strong>${this.formulaire.value.client.cni}</strong><br>
                                N°CNI  <strong>${this.formulaire.value.client.phone}</strong><br>
                            <br>
                        RECEPTTEUR <br> NomCpmlet <strong>${this.formulaire.value.client_recu.nomComplet}</strong><br>

                                N°CNI  <strong>${this.formulaire.value.client_recu.phone}</strong><br>
                              MONTANT ENVOIYER <br><H1>${this.formulaire.value.montant}</H1><br></div>`
                ,
          buttons: [
            {
              text: 'Cancel',
              handler: () =>{
                buttons: ['OK']
              }
          },
          {
            text: 'Confirmer',
            handler: async () => {
              await alert.present();
              this.transaction.addTransaction(this.formulaire.value).subscribe(
                async (data) => {
                  await loading.dismiss();
                  const alert = await this.alertCtrl.create({
                    cssClass: "my-custom-class",
                    header: 'Success',
                    message: "Success!! ",
                    buttons: ['OK']

                  });
                  await alert.present();
                }, async (erreur) => {
                  await loading.dismiss();
                  const alert = await this.alertCtrl.create({
                    cssClass: "my-custom-class",
                    header: 'Failed',
                    message: erreur.error,
                    buttons: ['OK']
                  });
                  await alert.present();
                  console.log(erreur);
                });
            }
          }
        ]
        });
        await alert.present();


}
}
