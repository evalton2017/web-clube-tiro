import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InscricaoCamp } from 'src/app/model/inscricaoCamp';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit {

  public dados: any;
  public loading = false;
  formInscricao: FormGroup;
  inscricao: InscricaoCamp;

  constructor(
    public dialogRef: MatDialogRef<InscricaoComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private filiadoService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
  ) { }

  ngOnInit(): void {
    this.dados = this.data;
    this.preencherInscricao();
  }

  preencherInscricao(){
    this.inscricao = new InscricaoCamp();
    this.inscricao.ativo = true;
    this.inscricao.filiado = this.dados.filiado;
    this.inscricao.campeonato = this.dados.campeonato;
    this.inscricao.dataInscricao = new Date();
    this.inscricao.status = 'Pendente Pagamento';
    this.inscricao.valor = this.dados.campeonato.valor;

  }

  salvar(){
    this.loading = true;
    this.filiadoService.incricaoCamp(this.inscricao)
     .subscribe(response => {
       this.loading = false;
       if (response) {
         this.snackBar.open("Inscrição realizada com sucesso. Aguardando Pagamento.", "Sucesso", { duration: 7000 });
         this.onNoClick();
       }
     }, err => {
       this.loading = false;
       let msg: string = err.error.text;
       console.log(err);
       if (err) {
         msg = "Erro ao realizar Inscrição.";
       }
       this.snackBar.open(msg, "Erro", { duration: 5000 });
     });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
