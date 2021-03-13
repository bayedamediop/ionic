import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/auth.service';
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
  constructor( private authService: AuthService , private fb: FormBuilder, private userService: UserService) { }
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
  //   this.formulaire = this.fb.group ({
  //     cni:['',Validators.required] ,
  //     nomComplet:['',Validators.required],
  //     phone:['',Validators.required] ,
  //     montant: ['',Validators.required],
  //     frais:['',Validators.required] ,
  //     total:['',Validators.required] ,
      
  //  });
  //  this.formulaire1 = this.fb.group ({
  //   nomComplet:['',Validators.required],
  //   phone:['',Validators.required] ,
  //   userDepotId:['',Validators.required] ,
  //   compteId: ['',Validators.required] ,
  //  })
   this.frai= this.authService.getAllfrais()
   //console.log(this.frai);
   
    
   for(let $i = 0; $i < this.frai; $i++)  {
    console.log(this.frai[$i]);
    
   }

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
    cni: new FormControl('',[Validators.required]),
    nomComplet: new FormControl('',[Validators.required]) ,
    phone: new FormControl('',[Validators.required]) ,
    montant: new FormControl('',[Validators.required]) ,
    frais: new FormControl('',[Validators.required]) ,
    total: new FormControl('',[Validators.required]) ,
    userDepotId: new FormControl() ,
    compteId: new FormControl('',[Validators.required]) ,
 });
 formbenfiche = new FormGroup({
  nomComplet: new FormControl('',[Validators.required]) ,
  phone: new FormControl('',[Validators.required]) ,
 
});
 

  frais(montant: any) {
    const frais = this.authService.getAllfrais()
    frais.forEach(element => {
     
      
    });
  }
 
  onSubmit() {
  //console.log(this.idCompte);
  //console.log(this.user);
  
  console.log(this.formbenfiche.value);
  console.log(this.formulaire.value);
  // this.authService. (formElement.value) .subscribe (
  //   (réponse) => {
  //     alert ('utilisateur ajouté avec succès!');
  //     this.router.navigate (['profiles']);
  //   }, (erreur) => {
  //     console.log (erreur);
  //   });
}
}
