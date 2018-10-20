import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form={
    email:null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error=[];
  constructor(
              private Jarwis: JarwisService, 
              private Token: TokenService,
              private router: Router,
              private Auth: AuthService
            ) { }
  onSubmit(){
    return this.Jarwis.signup(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );
  }

  handleError(error){
    this.error  = error.error.errors;
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
  }

}
