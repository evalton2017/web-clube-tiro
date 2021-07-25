import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from 'angular-admin-lte';
import { Filiado } from '../model/filiado';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../service/pessoa.service';
import { UserSessionService } from '../shared/user-session.service';
import { FotoComponent } from './foto/foto.component';

@Component({
  selector: 'app-filiado',
  templateUrl: './filiado.component.html',
  styleUrls: ['./filiado.component.css']
})
export class FiliadoComponent implements OnInit {

  public isCustomLayout: boolean;
  public loading = false;
  public pessoa: Pessoa;
  public filiado: Filiado;
  ativo = false;
  foto: '';
  dados: any;

  constructor(
    private layoutService:LayoutService,
    private usuarioSession: UserSessionService,
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { 
      this.pessoa = new Pessoa();
      this.filiado = new Filiado();
    }

  ngOnInit(): void {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.isCustomLayout = value;
    });
    this.getPessoa();
    this.consultaFiliado();
  }

  getPessoa(){
    this.loading = true;
    const dados = this.usuarioSession.obterDadosUsuario();
    this.pessoaService.buscaPessoaPorEmail(dados.email)
      .subscribe(response =>{
        this.loading = false;
        this.pessoa = response.result;
      },  err =>{
        this.loading = false;
        console.log('erro')
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      })
  }

  consultaFiliado(){
    this.dados = this.usuarioSession.obterDadosUsuario();
    console.log(this.dados)
    this.pessoaService.buscaFiliadoPorEmail(this.dados.email)
      .subscribe(response =>{
        this.loading = false;
        if(response.result){
          this.filiado = response.result;
          this.ativo = this.filiado.ativo;
          this.getUrl();
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

  anexarImagem(): void {
    const dialogRef = this.dialog.open(FotoComponent, {
      width: '40%',
      data: this.filiado
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.filiado = result;
    });
  }

  
  getUrl() {
    this.pessoaService.getUrl(this.filiado.foto)
      .subscribe(response => {
        if (response) {
          this.foto = response.retorno;         
        }
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err) {
          msg = "Erro ao consultar Foto do filiado.";
        }
      });
  }

}
