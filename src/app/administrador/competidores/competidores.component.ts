import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AdminService } from '../service/admin.service';
import { ModalComponent } from './modal/modal.component';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-competidores',
  templateUrl: './competidores.component.html',
  styleUrls: ['./competidores.component.css']
})
export class CompetidoresComponent implements OnInit {

  
  public loading = false;
  dataSourceCompetidor: MatTableDataSource<Filiado>;
  colunas: string[] = ['id', 'nome', 'email','cpf','opcoes'];
  public filiado: Filiado;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(    private snackBar: MatSnackBar,
    private adminService:AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    public dialog: MatDialog) {
      
     }

  ngOnInit(): void {
    this.listarCompetidores();
  }

  listarCompetidores(){
    this.loading = true
    this.adminService.listarCompetidores()
      .subscribe(
        response =>{
          this.loading = false;
          const filiados = response.result;
          this.dataSourceCompetidor = new MatTableDataSource<Filiado>(filiados);
          this.dataSourceCompetidor.sort = this.sort;
          this.dataSourceCompetidor.paginator = this.paginator;
        },
        err =>{
          this.loading = false;
          const msg: string = "Erro ao carregar os filiados.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      )
  }

  visualizar(filiado: any): void {
    const dialogRef = this.dialog.open(ViewComponent, {
      width: '40%',
      data: filiado
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.filiado = result;
    });
  }

}
