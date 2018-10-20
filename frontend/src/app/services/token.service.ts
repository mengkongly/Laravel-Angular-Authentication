import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login:'http://localhost:8000/api/login',
    signup:'http://localhost:8000/api/signup'
  };

  constructor() { }

  handle(token){
    this.set(token);
    //console.log(this.loggedIn());
  }

  set(token){
    localStorage.setItem('token',token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
  }

  isValid(token){
    token   = this.get();
    if(token){ // check if token existed
      const payload = this.payload(token);
      if(payload){
        //return payload.iss==='http://localhost:8000/api/login'?true:false;
        return (Object.values(this.iss).indexOf(payload.iss)>-1)?true:false;
      }
    }
    return false;
  }

  payload(token){
    const payload = token.split('.')[1];
    return this.decode(payload);

  }

  decode(payload){
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    const token=this.get();
    return this.isValid(token);
  }
}
