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
  constructor(private authService: TransactionService) { }
  forms = new FormGroup({
    montant: new FormControl('',[Validators.required])
  })
  ngOnInit() {
  }
  calculator (){
    console.log(this.forms.value.montant);
   this.authService.calculefrais("12233").subscribe(data => {
     console.log(data);

   })

  }
}
