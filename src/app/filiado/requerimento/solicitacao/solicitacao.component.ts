import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Filiado } from 'src/app/model/filiado';
import { Requerimento } from 'src/app/model/requerimento';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {

  public loading = false;
  dataSource: MatTableDataSource<Requerimento>;
  colunas: string[] = ['id', 'nome', 'objetivo','arma','status','opcoes'];
  public filiado: Filiado;
  public requerimento: Requerimento;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _formBuilder:FormBuilder,
    private loginservice:LoginService,
    private snackBar:MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    private pessoaService: PessoaService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.consultaFiliado();
  
  }

  consultarRequerimento(id:any){
    this.loading = true;
    this.pessoaService.buscaRequerimentoPorFiliado(id)
      .subscribe(response =>{

        if(response.result){
          this.loading = false;
          this.dataSource = new MatTableDataSource<Filiado>(response.result);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         console.log(response);
        }
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Erro ao consultar Requerimento";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });

  }

  consultaFiliado(){
    const dados = this.usuarioSession.obterDadosUsuario();
    this.pessoaService.buscaFiliadoPorEmail(dados.email)
      .subscribe(response =>{
        this.loading = false;
        if(response.result){
          this.filiado = response.result;
          this.consultarRequerimento(response.result.id);
        }
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Erro ao consultar Filiado";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }

}
