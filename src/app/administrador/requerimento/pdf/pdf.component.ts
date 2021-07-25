import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { LoginService } from 'src/app/service/login.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { DatePipe } from '@angular/common';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Requerimento } from 'src/app/model/requerimento';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  public filiado: Filiado;
  public requerimento: Requerimento;
  public loading = false;
  public dataHoje = new Date();


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
    this.requerimentoPdf();
  }

  requerimentoPdf() {
    this.loading = true;
    this.route.params.subscribe((requerimento: Params) => {
      console.log(requerimento.pdf);
      this.adminService.buscaRequerimento(requerimento.pdf).subscribe(res => {
        this.loading = false;
        if (res) {
          console.log(res.result)
          this.requerimento = res.result;
        }
      });
    }, error => {
      this.loading = false;
    });
  }

  gerarPdf(){
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 240;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 10;
      pdf.addImage(contentDataURL, 'PNG', 20, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }

}