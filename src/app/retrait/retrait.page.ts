import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../auth/transaction.service';
import { Transaction } from 'src/moddules/Transactions';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  private activeBeneficier = false;
  private activeEmeteur = true;
  user = null;
  transaction: any;
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
  constructor( private authService: TransactionService) { }
  firstFormGroup: FormGroup;
  formulaire: FormGroup;

  ngOnInit() {
    
  }
  recherge = new FormGroup({
    code: new FormControl(855451505)
  })
  recherger(){
    //console.log(this.recherge.value);
    this.authService.getTransactionBycODE(855451505).subscribe(data => {
      this.transaction = data;
      console.log(this.transaction['clientEnvoie']);
      
    })
  }
  
  onSubmit() {
  
   
  }
}
