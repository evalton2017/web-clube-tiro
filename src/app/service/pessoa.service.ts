import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Filiado } from '../model/filiado';
import { Pessoa } from '../model/pessoa';
import { Requerimento } from '../model/requerimento';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  URI = environment.url;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  buscaPessoaPorEmail(email: string){
    return this.http.get<any>(this.URI+`filiado/buscapessoa/${email}`, this.httpOptions)
  }

  atualizarPessoa(pessoa: Pessoa){
    return this.http.post<any>(this.URI+`filiado/pessoa/atualizar`,pessoa, this.httpOptions)
  }

  pesquisaCep(cep: any){
    return this.http.get<any>(this.URI+`buscaCep/${cep}`, this.httpOptions)
  }

  cadastrarFiliado(filiado: Filiado){
    return this.http.post<any>(this.URI+`filiado/cadastrar`,filiado, this.httpOptions)
  }

  cadastrarRquerimentoArmaAcessorio(requerimento: Requerimento){
    return this.http.post<any>(this.URI+`filiado/solicitar/requerimento/arma`,requerimento, this.httpOptions)
  }

  buscaFiliadoPorEmail(email: string){
    return this.http.get<any>(this.URI+`filiado/buscar/${email}`, this.httpOptions)
  }

  buscaRequerimentoPorFiliado(id: any){
    return this.http.get<any>(this.URI+`filiado//buscar/requerimento/arma/${id}`, this.httpOptions)
  }

  uploadImagemCamp(formData: FormData, id: any){
    return this.http.post<any>(this.URI+`filiado/upload/foto/${id}`,formData) 
  }

  getUrl(id: any){
    return this.http.get<any>(this.URI+`filiado/foto/url/${id}`, this.httpOptions)
  }  

  incricaoCamp(inscricao: any){
    return this.http.post<any>(this.URI+`filiado/campeonato/inscricao`, inscricao, this.httpOptions)
  }

  enviarEmail(email: any){
    return this.http.post<any>(this.URI+`filiado/contato/email`, email, this.httpOptions)
  }
 

}
