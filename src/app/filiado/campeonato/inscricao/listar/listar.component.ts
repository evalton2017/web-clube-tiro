import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public loading = false;
  dataSource= new MatTableDataSource();
  colunas: string[] = ['filiado', 'campeonato', 'datainscricao','valor','situacao'];

  public filiado: Filiado;
  pesquisa: string = '';
  nenhumRegistro = false;
  dados: any;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    private pessoaService: PessoaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.consultaFiliado();
  }

  consultaFiliado(){
    this.loading = true;
    this.dados = this.usuarioSession.obterDadosUsuario();
    console.log(this.dados)
    this.pessoaService.buscaFiliadoPorEmail(this.dados.email)
      .subscribe(response =>{
        this.loading = false;
        if(response.result){
          this.filiado = response.result;
          this.dataSource.data = this.filiado.inscricoes;
          console.log(this.dataSource.data);
        }
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      })

  }

  pesquisar(){
    this.converterPesquisar(this.pesquisa);
    let dados  = this.filiado.inscricoes.filter(optionValue => optionValue.campeonato.nome.toLowerCase().includes(this.pesquisa.toLowerCase()));
    this.dataSource.data = dados;    
  }

  converterPesquisar(valor: string){
    if (valor === 'nao' || valor === 'não'){
      valor = 'false';
      this.dataSource.filter = valor.trim().toLowerCase();
    }else if (valor === 'sim'){
      valor = 'true';
      this.dataSource.filter = valor.trim().toLowerCase();
    }
  }

}

