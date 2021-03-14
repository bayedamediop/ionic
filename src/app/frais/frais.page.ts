import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../auth/transaction.service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.page.html',
  styleUrls: ['./frais.page.scss'],
})
export class FraisPage implements OnInit {
frais : any;
  constructor(private auth: TransactionService) { }
  forms = new FormGroup({
    montant: new FormControl('',[Validators.required])
  })
  ngOnInit() {
  }
  calculator (){
   this.auth.calculefrais(this.forms.value).subscribe(data => {
     this.frais = data
   })
   
  } 
}
