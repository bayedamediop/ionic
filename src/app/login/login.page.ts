
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Injectable({ 
  providedIn: 'any'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;
  formLogin: FormGroup;
  fakeAuth = false;
  submitted = false;
  private token: string;
  constructor( private authService: AuthService, private route: Router,  private formBuilder: FormBuilder,
  ) {
  }
  ngOnInit(): any{
    this.formLogin = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(4)]]
    });
  }
  get f(): any{
    return this.formLogin.controls ;
  }
  onSubmit(): any {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
    }
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      data => {
      // console.log(this.authService.getToken());
       //this.route.navigateByUrl('/tabs');
       // console.log(data);
    }, (error) => {
        console.log(error);
        this.fakeAuth = true ;
        return ;
    });
  }
  }
