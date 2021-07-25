import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { LoginService } from 'src/app/service/login.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { DatePipe } from '@angular/common';
import {Requerimento} from '../../model/requerimento';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { StatusEnum } from 'src/app/model/status.enum';

@Component({
  selector: 'app-requerimento',
  templateUrl: './requerimento.component.html',
  styleUrls: ['./requerimento.component.css']
})
export class RequerimentoComponent implements OnInit {

  public filiado: Filiado;
  public requerimento: Requerimento;
  public formRequerimento: FormGroup;
  public loading = false;


  constructor(
    private _formBuilder:FormBuilder,
    private loginservice:LoginService,
    private snackBar:MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    private pessoaService: PessoaService,
    private datePipe: DatePipe
  ) { 
    this.filiado = new Filiado();
  }

  ngOnInit(): void {
    this.gerarformaRequerimento();
    this.consultaFiliado();
  }

  gerarformaRequerimento(){
      this.formRequerimento = this._formBuilder.group({
        colecionamento: [''],
        cnpj: ['', [Validators.required, CnpjValidator]],
        tiroDesp: [''],
        caca: [''],
        entDesp: [''],
        aquicaoAcessorio: [''],
        tipo: ['', Validators.required],
        calibre: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        quantidade: ['', Validators.required],
        fornecedor: ['', Validators.required],
        crForn: ['', Validators.required],
        dadosTec: [''],
        
      });
  }

  consultaFiliado(){
    const dados = this.usuarioSession.obterDadosUsuario();
    this.pessoaService.buscaFiliadoPorEmail(dados.email)
      .subscribe(response =>{
        this.loading = false;
        if(response.result){
          this.filiado = response.result;
        }
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Erro ao consultar Filiado";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }

  solicitarRequerimento(){
    this.setDados();
    this.pessoaService.cadastrarRquerimentoArmaAcessorio(this.requerimento)
      .subscribe(response =>{
        this.loading = false;
        console.log(response.message)
        this.snackBar.open(response.message, "Sucesso", {duration:5000});
        this.router.navigate(['filiado'])
      },  err =>{
        console.log('erro')
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Erro ao solicitar o requerimento";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }
  
  setDados(){
    this.requerimento = this.formRequerimento.value;
    this.requerimento.filiado = this.filiado;
    this.requerimento.status = StatusEnum.PENDENTE;
  }

}
