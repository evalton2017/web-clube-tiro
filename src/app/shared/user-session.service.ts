import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor() { }

  
  headers(){
    let httpHeaders : HttpHeaders = new HttpHeaders();

    if(localStorage['']){
      httpHeaders = httpHeaders.set(
        'Authorization', 'Bearer' + localStorage['token']
      );
    }
    return {headers: httpHeaders};
  }


  obterDadosUsuario(){
    if(!localStorage['token']){
      return '';
    }
    return JSON.parse(localStorage['user']);
  }

  
  static getDadosUsuario(){
    if (!localStorage['token']){
      return '';
    }
    return JSON.parse(localStorage['user']);
  }

  isAuthenticated(url: string): boolean{
    let dados = this.obterDadosUsuario();
    let rota = url.split('/',3);
    if (dados){
      switch(rota[1]){
        case 'filiado':{
          return dados.rules[0].Filiado || dados.rules[0].Competidor?  true: false
          break;
        }
     /*   case 'competidor':{
          return dados.rules[0].Competidor?  true: false
          break;
        }*/
        case 'admin':{
          return dados.rules[0].Admin?  true: false
          break;
        }
      }
    }
    return false;
  }

 
  

}
