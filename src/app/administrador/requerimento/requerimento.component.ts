import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { LoginService } from 'src/app/service/login.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { DatePipe } from '@angular/common';
import {Requerimento} from '../../model/requerimento';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../service/admin.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-requerimento',
  templateUrl: './requerimento.component.html',
  styleUrls: ['./requerimento.component.css']
})
export class RequerimentoComponent implements OnInit {

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
    private adminService: AdminService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.consultarRequerimento();
  
  }

  consultarRequerimento(){
    this.loading = true;
    this.adminService.listarRequerimentos()
      .subscribe(response =>{
        console.log(response);
        if (response.result){
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
        if (err['status']==401){
          msg = "Erro ao consultar Requerimento";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });

  }

  gerarPdf(requerimento:any){
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 100;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 2;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('requerimento.pdf'); // Generated PDF   
    }); 

  }

}

