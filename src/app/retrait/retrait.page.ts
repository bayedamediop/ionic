import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  constructor() { }
  firstFormGroup: FormGroup;
  formulaire: FormGroup;

  ngOnInit() {
    this.formulaire = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.formulaire = new FormGroup({
      password: new FormControl('', Validators.required)
    });
  }

  get email() { return this.formulaire.get('email'); }
  get password() { return this.formulaire.get('password'); }
  selectChange(e) {
    console.log(e);
  }
  onSubmit() {
   console.log(this.formulaire.value);
   
  }

}
