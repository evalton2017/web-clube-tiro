import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.css']
})
export class InscritosComponent implements OnInit {

  public loading = false;
  dataSource= new MatTableDataSource();
  colunas: string[] = ['filiado', 'campeonato', 'datainscricao','valor','situacao', 'opcoes'];

  public filiado: Filiado;
  public inscritos: InscritosComponent;
  pesquisa: string = '';
  nenhumRegistro = false;
  dados: any;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    private adminService: AdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.consultarInscritos();
  }

  consultarInscritos(){
    this.loading = true;
    console.log(this.dados)
    this.adminService.listaInscritos()
      .subscribe(response =>{
        this.loading = false;
        if(response.retorno){
          this.dataSource.data = response.retorno;
        }
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Erro ao consultar os Inscritos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }

  confirmarPagamento(inscricao: any){
    inscricao.status = 'Pagamento Confirmado';
    inscricao.dataPagamento = new Date();
    this.loading = true;
    console.log(this.dados)
    this.adminService.confirmarPagamento(inscricao)
      .subscribe(response =>{
        this.loading = false;
        this.snackBar.open("Pagamento confirmado com sucesso!", "Erro", {duration:5000});        
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Erro ao confirmar pagamento";
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
