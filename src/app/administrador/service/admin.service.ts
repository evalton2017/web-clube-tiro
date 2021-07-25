import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arquivo } from 'src/app/model/arquivo';
import { Campeonato } from 'src/app/model/campeonato';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  URI = environment.url;

  
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsImage = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=something'})
  };

  
  listarFiliados(){
    return this.http.get<any>(this.URI+`admin/filiados`, this.httpOptions)
  }

  listarCompetidores(){
    return this.http.get<any>(this.URI+`admin/competidores`, this.httpOptions)
  }

  ativarFiliado(uid: any){
    return this.http.get<any>(this.URI+`admin/filiado/ativar/${uid}`, this.httpOptions)
  }

  desativarFiliado(uid: any){
    return this.http.get<any>(this.URI+`admin/filiado/desativar/${uid}`, this.httpOptions)
  }

  listarRequerimentos(){
    return this.http.get<any>(this.URI+`admin/requerimentos`, this.httpOptions)
  }

  buscaRequerimento(id: any){
    return this.http.get<any>(this.URI+`admin/requerimento/${id}`, this.httpOptions)
  }
  
  quantidadeFiliado(){
    return this.http.get<any>(this.URI+`admin/quantidade/filiado`, this.httpOptions)
  }

  quantidadeCompetidor(){
    return this.http.get<any>(this.URI+`admin/quantidade/competidor`, this.httpOptions)
  }

  //CAMPEONATO
  listaCampeoanto(){
    return this.http.get<any>(this.URI+`admin/campeonatos`, this.httpOptions)
  }
 
  listaModalidade(){
    return this.http.get<any>(this.URI+`admin/modalidades`, this.httpOptions)
  }

  cadastrarCampeonato(campeonato: Campeonato){
    return this.http.post<any>(this.URI+`admin/campeonato/cadastrar`,campeonato, this.httpOptions)
  }

  uploadImagemCamp(formData: FormData, id: any){
    return this.http.post<any>(this.URI+`admin/upload/campeonato/${id}`,formData) 
  }

  listaInscritos(){
    return this.http.get<any>(this.URI+`admin/inscritos`, this.httpOptions)
  }

  confirmarPagamento(inscricao: any){
    return this.http.post<any>(this.URI+`admin/inscritos/confirmar-pagamento`,inscricao) 
  }
  
  

}
