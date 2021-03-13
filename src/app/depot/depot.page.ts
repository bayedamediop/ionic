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

   this.frai= this.authService.getAllfrais()
   this.frai.forEach(element => {
     console.log(element[0]['id']);
     
     
   });
    this.token = this.authService.getToken() ;
    const tokenDecoded = this.helper.decodeToken(this.token);
   // console.log(tokenDecoded);
    this.nameUserConnected = tokenDecoded.username;
    // console.log(this.nameUserConnected);
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
     //console.log(this.users);
      
      this.users.forEach((element: any) => {
        if (element.email === this.nameUserConnected) {
           // console.log(element.id);
            element['transactions'].forEach((element: any) => {
              this.idCompte=(element['copmte'].id);
              this.solde=(element['copmte'].solde);
             // console.log(this.solde);

            }),
            //console.log(element['transactions'][0]);
           this.idUserConnected = element.id;
           //console.log(this.idUserConnected);
           
         // console.log(this.idCompte);
        }
      }) ;
    });
    // const tokenDecoded = this.helper.decodeToken(response.token) ;
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

  frais(montant: any) {
    const frais = this.authService.getAllfrais()
    frais.forEach(element => {
     
      
    });
  }
 
  async onSubmit() {
  const loading = await this.loadingCtrl.create({
    message:'Please wait ...'
  });
  await loading.present();
  this.transaction.addTransaction(this.formulaire.value) .subscribe (
    async (data) => {
     await  loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Succe',
        cssClass: "my-custom-class",
        message: "success",
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
