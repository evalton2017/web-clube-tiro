import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AdminService } from '../service/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { FotoComponent } from 'src/app/filiado/foto/foto.component';

export interface Element {
  nome: string;
  cpf: number;
 }

@Component({
  selector: 'app-filiados',
  templateUrl: './filiados.component.html',
  styleUrls: ['./filiados.component.css']
})
export class FiliadosComponent implements OnInit {

  public loading = false;
  dataSource= new MatTableDataSource();
  colunas: string[] = ['id', 'nome', 'email','cpf','ativo','opcoes'];
  public filiado: Filiado;
  pesquisa: string = '';
  nenhumRegistro = false;
  filiados: Filiado[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( 
    private snackBar: MatSnackBar,
    private adminService:AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {   
    this.listarFiliado();
  }

  listarFiliado(){
    this.loading = true
    this.adminService.listarFiliados()
      .subscribe(
        response =>{
          this.loading = false;
          this.filiados = response.result;
          this.dataSource.data = response.result; 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;       
        },
        err =>{
          this.loading = false;
          const msg: string = "Erro ao carregar os filiados.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      )
  }

  ativarDialog(filiado: any): void {
    console.log(filiado)
    let dados = {titulo: 'Ativar de Filiado', acao:'ativar',
            nome: filiado.pessoa.nome, email: filiado.pessoa.email, id: filiado.id}
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.filiado = result;
    });
  }


  desativarDialog(filiado: any): void {
    let dados = {titulo: 'Desativação de Filiado', acao: 'desativar',
     nome: filiado.pessoa.nome, email: filiado.pessoa.email, id: filiado.id}
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.filiado = result;
    });
  }

  pesquisar(){
    this.converterPesquisar(this.pesquisa);
    let dados  = this.filiados.filter(optionValue => optionValue.pessoa.nome.toLowerCase().includes(this.pesquisa.toLowerCase()));
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

