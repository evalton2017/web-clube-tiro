import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URI = environment.url;
  
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  logar(user:User){
    return this.http.post<any>(this.URI+`login`, user, this.httpOptions)
  }

  cadastrar(pessoa:Pessoa){
    return this.http.post<any>(this.URI+`login/cadastrar`, pessoa, this.httpOptions)
  }

  resetSenha(email:string){
    return this.http.post<any>(this.URI+`reset/password/${email}`, this.httpOptions)
  }

  loginGoogle(){
    return this.http.get<any>(`http://localhost:3000/api/login/google`, this.httpOptions)
  }

}
