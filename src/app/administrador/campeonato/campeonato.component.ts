import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AdminService } from '../service/admin.service';
import {MatDialog} from '@angular/material/dialog';
import { Campeonato } from 'src/app/model/campeonato';
import { CadastroCampComponent } from './cadastro-camp/cadastro-camp.component';
import { ImagemComponent } from './imagem/imagem.component';


@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {

  public loading = false;
  dataSource= new MatTableDataSource();
  colunas: string[] = ['id', 'nome', 'inicio','fim','valor','opcoes'];
  public filiado: Filiado;
  pesquisa: string = '';
  nenhumRegistro = false;
  campeonatos: Campeonato[]=[];
  campeonato: Campeonato;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private adminService:AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    public dialog: MatDialog
  ) { 
    this.campeonato = new Campeonato();
  }

  ngOnInit(): void {
    this.listarCampeonato();
  }

  listarCampeonato(){
    this.loading = true;
    this.adminService.listaCampeoanto()
      .subscribe(response =>{
        this.loading = false;
        if (response){
          this.dataSource.data = response.retorno;
        }
      },  err =>{
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status']==422){
          msg = "Erro ao consultar campeonatos.";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }

  editar(campeonato: any): void {
    const dialogRef = this.dialog.open(CadastroCampComponent, {
      width: '60%',
      data: campeonato
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.campeonato = result;
    });
  }

  cadastrar(): void {
    const dialogRef = this.dialog.open(CadastroCampComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.campeonato = result;
    });
  }

  anexarImagem(campeonato: any): void {
    let camp = campeonato;
    const dialogRef = this.dialog.open(ImagemComponent, {
      width: '40%',
      data: camp
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.campeonato = result;
    });
  }


  pesquisar(){
    this.converterPesquisar(this.pesquisa);
    this.dataSource.filter = this.pesquisa.trim().toLowerCase();
  //  this.dataSource.data = dados;    
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
