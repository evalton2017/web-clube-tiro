import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Filiado } from '../model/filiado';
import { Pessoa } from '../model/pessoa';
import { Requerimento } from '../model/requerimento';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  URI = environment.url;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  listarCampeonatos(){
    return this.http.get<any>(this.URI+`site/campeonatos`, this.httpOptions)
  }

  getUrl(id: any){
    return this.http.get<any>(this.URI+`site/campeonatos/url/${id}`, this.httpOptions)
  }
 

}
