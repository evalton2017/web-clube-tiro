import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formEmail: FormGroup;
  public loading = false;

  constructor(
    private _formBuilder:FormBuilder,
    private snackBar:MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
  ) { }

  ngOnInit(): void {
    this.gerarFormEmail();
  }

  gerarFormEmail(){
    this.formEmail = this._formBuilder.group({
      email: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  enviarEmail(){
    this.loading = true;
    this.pessoaService.enviarEmail(this.formEmail.value)
    .subscribe(response =>{
      this.loading = false;
      this.snackBar.open("Email enviado com sucesso, aguarde nosso retorno.", "Sucesso", {duration:6000});
    },  err =>{
      this.loading = false;
      let msg: string = err.error.text;
      console.log(err);
      if(err['status']==422){
        msg = "Erro ao enviar email";
      }
      this.snackBar.open(msg, "Erro", {duration:5000});
    })
  }

}

