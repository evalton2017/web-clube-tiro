import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { HomeService } from 'src/app/service/home.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { InscricaoComponent } from './inscricao/inscricao.component';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit, AfterViewInit {

  loading = false;
  public albums_1: Array<any> = []
  public albums_1_aux: Array<any> = []
  campeonatos: Array<any> = [];
  filiado: Filiado;
  dadosFiliado: any;

  constructor(
    private pessoaService: PessoaService,
    private homeService: HomeService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioSession: UserSessionService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.campeonatos = [];
  }

  ngOnInit(): void {
    this.listarCamnpeonatos();
    this.consultaFiliado();
  }

  ngAfterViewInit(): void {
    this.verificaCampeonatosInscritos();
  }

  listarCamnpeonatos() {
    this.loading = true;
    this.homeService.listarCampeonatos()
      .subscribe(response => {
        if (response) {
          response.retorno.forEach((camp) => {
            this.getUrl(camp);
          })
        }
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status'] == 422) {
          msg = "Erro ao consultar campeonatos.";
        }
      });
  }

  consultaFiliado() {
    this.dadosFiliado = this.usuarioSession.obterDadosUsuario();
    this.pessoaService.buscaFiliadoPorEmail(this.dadosFiliado.email)
      .subscribe(response => {
        if (response.result) {
          this.filiado = response.result;
        }
      }, err => {
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if (err['status'] == 401) {
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      })

  }

  getUrl(camp: any) {
    this.campeonatos = [];
    this.homeService.getUrl(camp.foto)
      .subscribe(response => {
        if (response) {
          camp.url = response.retorno;
          this.campeonatos.push(camp);
        }
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status'] == 422) {
          msg = "Erro ao consultar campeonatos.";
        }
      });
  }

  verificaCampeonatosInscritos() {
    setTimeout(() => {
      this.loading = false;
      this.campeonatos.forEach((c) => {
        this.filiado.inscricoes.forEach((i) => {
          if (c.id == i.campeonato.id) {
            c.inscricao = true;
          }
        })
      })
      console.log(this.campeonatos);
    }, 3000);

  }

  inscricaoCampeonato(campeonato: any): void {
    let data = { campeonato: campeonato, filiado: this.filiado }
    const dialogRef = this.dialog.open(InscricaoComponent, {
      width: '60%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.filiado = result;
    });
  }


}

