import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/model/pefil';
import { Pessoa } from 'src/app/model/pessoa';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true
  pessoa: Pessoa;
  perfil: Perfil;
  loading = false;

  constructor(
    private _formBuilder:FormBuilder,
    private loginservice:LoginService,
    private snackBar:MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.perfil= new Perfil();
     }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cpf: ['', ],
      rg: ['', ],
      dataexp: ['', ],
      datanasc: ['', ],
      naturalidade: ['', ],
      nomemae: ['', ],
      nomepai: ['', ]
    });
  }

  cadastrar(){
    this.loading = true;
    this.setPessoa();
    this.loginservice.cadastrar(this.pessoa)
    .subscribe(data=>{
      this.loading = false;
      if(data.result != undefined){
        switch(data.result){
          case 'Password should be at least 6 characters': {
            this.snackBar.open("Senha deve ter no minimo 6 caracteres!", "Erro", {duration:5000});
            break;
          }
          case 'The email address is already in use by another account.':{
            this.snackBar.open("Email já cadastrado!", "Erro", {duration:5000});
            break;
          }

          default: 
            this.loading = false;
            this.snackBar.open("Usuario cadastrado com sucesso!", "Sucesso", {duration:5000});
            this.router.navigate(['/login']);
            break;
        }
      }
    })
  }

  setPessoa(){
    this.pessoa = this.secondFormGroup.value;
    this.perfil = this.firstFormGroup.value;
    this.pessoa.dataexp = new Date();
    this.pessoa.datanasc = new Date();
    this.pessoa.perfis = [this.perfil]
  }
  
}
