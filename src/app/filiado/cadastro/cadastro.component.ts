import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/model/endereco';
import { Filiado } from 'src/app/model/filiado';
import { Perfil } from 'src/app/model/pefil';
import { Pessoa } from 'src/app/model/pessoa';
import { Telefone } from 'src/app/model/telefone';
import { LoginService } from 'src/app/service/login.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import * as moment from 'moment';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formPessoa: FormGroup;
  formFiliado: FormGroup;
  isEditable = true
  pessoa: Pessoa;
  perfil: Perfil;
  filiado: Filiado;
  endereco: Endereco;
  telefone: Telefone;
  filiadoUpdate: Filiado;
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
      this.perfil= new Perfil();
      this.filiado = new Filiado();
      this.pessoa = new Pessoa();
      this.filiadoUpdate = new Filiado();
     }


  ngOnInit(): void {
    this.getPessoa();
    this.consultaFiliado();
    this.gerarFormPessoa();
    this.gerarFormFiliado();   
  }

  gerarFormPessoa(){
    this.formPessoa = this._formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', [Validators.required, CpfValidator]],
      rg: ['', Validators.required],
      dataexp: ['', Validators.required],
      datanasc: ['', Validators.required],
      naturalidade: ['', Validators.required],
      nomemae: ['', Validators.required],
      nomepai: ['', Validators.required]
    });
  }

  gerarFormFiliado(){
   this.formFiliado = this._formBuilder.group({
      id: ['', ],
      instrutor: ['', ],
      atirador: ['', ],
      colecionador: ['', ],
      cacador: ['', ],
      telefones: this._formBuilder.array([this.criarFormTelefones()]),
      pessoa: ['', Validators.required],  
      foto: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      complemento: [''],
      numero:['', Validators.required],
      uf: ['', Validators.required],
      logradouro: ['', Validators.required],
      localidade: ['', Validators.required],  
      cr: ['', Validators.maxLength(7)],
      validadeCr: ['']
   })
}

  cadastrarFiliado(){
    this.loading = true;
    this.setFormFiliado();
    this.pessoaService.cadastrarFiliado(this.filiado)
    .subscribe(response =>{
      this.loading = false;
      this.snackBar.open("Dados do filiado atualizados.", "Sucesso", {duration:5000});
      this.formFiliado.patchValue({
        id: response.result.id
      })
    },  err =>{
      this.loading = false;
      let msg: string = err.error.text;
      console.log(err);
      if(err['status']==401){
        msg = "Email/senha invalidos";
      }
      this.snackBar.open(msg, "Erro", {duration:5000});
    })
  }

 setFormPessoa(pessoa: any){
  this.formPessoa.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      email: pessoa.email,
      cpf: pessoa.cpf,
      rg: pessoa.rg,
      dataexp: this.converteDate(pessoa.dataexp),
      datanasc: this.converteDate(pessoa.datanasc),
      naturalidade: pessoa.naturalidade,
      nomemae: pessoa.nomemae,
      nomepai: pessoa.nomepai
    })
  }

  converteDate(date:Date){
    return this.datePipe.transform(date,"yyyy-MM-dd");
  }

  converteParaDate(data: string) {
    return moment(data).format('DD/MM/YYYY');
  }

  setFormFiliado(){
    this.filiado = new Filiado();
    console.log(this.formFiliado.value.id)
    if(this.formFiliado.value.id !== null && this.formFiliado.value.id != ''){
      this.filiado.id = this.formFiliado.value.id;
    }
    this.setarEndereco();
    this.filiado.atirador = this.formFiliado.value.atirador;
    this.filiado.instrutor = this.formFiliado.value.instrutor; 
    this.filiado.colecionador = this.formFiliado.value.colecionador; 
    this.filiado.cacador = this.formFiliado.value.cacador;
    this.filiado.telefones = this.formFiliado.value.telefones; 
    this.filiado.pessoa = this.pessoa;
    this.filiado.endereco = this.endereco;
    this.filiado.ativo = false;
    this.filiado.cr = this.formFiliado.value.cr;
    this.filiado.validadeCr = this.formFiliado.value.validadeCr;
  }

  setarEndereco(){
    this.endereco = new Endereco();
    this.endereco.cep = this.formFiliado.value.cep;
    this.endereco.bairro = this.formFiliado.value.bairro;
    this.endereco.logradouro = this.formFiliado.value.logradouro;
    this.endereco.complemento = this.formFiliado.value.complemento;
    this.endereco.localidade = this.formFiliado.value.localidade;
    this.endereco.numero = this.formFiliado.value.numero;
    this.endereco.uf = this.formFiliado.value.uf;

  }

  getPessoa(){
    this.loading = true;
    const dados = this.usuarioSession.obterDadosUsuario();
    this.pessoaService.buscaPessoaPorEmail(dados.email)
      .subscribe(response =>{
        this.loading = false;
        this.setFormPessoa(response.result);
        this.formFiliado.patchValue({pessoa: response.result.nome})
        this.pessoa = response.result;
      },  err =>{
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      })
  }

  atualizarPessoa(){
    this.loading = true;
    this.pessoa = this.formPessoa.value;
    this.pessoaService.atualizarPessoa(this.pessoa)
      .subscribe(response =>{
        this.loading = false;
        this.setFormPessoa(response.result);
        this.pessoa = response.result;
        this.snackBar.open("Dados pessoais atualizados.", "Sucesso", {duration:5000});
      },  err =>{
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if(err['status']==401){
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      })
  }

  consultaFiliado(){
    const dados = this.usuarioSession.obterDadosUsuario();
    this.pessoaService.buscaFiliadoPorEmail(dados.email)
      .subscribe(response =>{
        this.loading = false;
        if(response.result){
          this.setDadosFiliado(response.result);
          this.filiado = response.result;
          this.filiadoUpdate = response.result;
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

  setDadosFiliado(filiado: any){
    this.formFiliado.patchValue({
      id: filiado.id,
      instrutor: filiado.instrutor,
      atirador: filiado.atirador,
      colecionador: filiado.colecionador,
      cacador: filiado.cacador,
      telefones: filiado.telefones,
      pessoa: filiado.pessoa.nome,  
      foto: filiado.foto,
      bairro: filiado.endereco.bairro,
      cep: filiado.endereco.cep,
      complemento: filiado.endereco.complemento,
      numero: filiado.endereco.numero,
      uf: filiado.endereco.uf,
      logradouro: filiado.endereco.logradouro,
      localidade: filiado.endereco.localidade, 
      cr: filiado.cr,
      validadeCr: this.converteDate(filiado.validadeCr)
    })
  }

  buscaCep(){
    this.loading = true;
    this.pessoaService.pesquisaCep(this.formFiliado.value.cep)
      .subscribe(response =>{
        this.loading = false;
        this.setEndereco(response.result);
      },  err =>{
        this.loading = false;
        let msg: string = err.error;
        console.log(err);
        this.snackBar.open(msg, "Erro", {duration:5000});
      })
  }

  criarFormTelefones() {
    return this._formBuilder.group({
      ddd: [''],
      numero: ['', Validators.required],
    });
  }

  
  getTelefoneMask(value: string): string {
    return (value && value.length > 8) ? '0 0000-0009' : '0000-00009';
  }
  
  get telefones(): FormArray {
    return this.formFiliado.get('telefones') as FormArray;
  }

  get enderecos(): FormArray {
    return this.formFiliado.get('endereco') as FormArray;
  }


  adicionaTelefone() {
    this.telefones.push(this.criarFormTelefones());
    this.formFiliado.patchValue(this.filiado);
  }

  removeTelefones(posicao: number) {
    this.telefones.controls.splice(posicao, 1);

    this.formFiliado.patchValue(this.filiado);
  }

  setEndereco(end: any){
    this.formFiliado.patchValue({
      logradouro: end.logradouro,
      bairro: end.bairro,
      uf: end.uf,
      localidade: end.localidade,
      
    })
  }

  validaCPF(campo){
    console.log(this.formPessoa.get(campo).valid)
    console.log(this.formPessoa.get(campo).touched)
    if(this.formPessoa.get(campo).valid && this.formPessoa.get(campo).touched){
      console.log(this.formPessoa.get(campo).valid && this.formPessoa.get(campo).touched)
      return true;
    }
    return false;
    //return !campo.valid && campo.touched;
  }

  verificaValidTouched(campo){
    if(this.formPessoa.get(campo).errors !== null){
      return this.formPessoa.get(campo).errors.cpf && !this.formPessoa.get(campo).errors.required;
    }
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };

}
