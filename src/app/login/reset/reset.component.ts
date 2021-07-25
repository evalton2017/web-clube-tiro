import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'src/app/administrador/filiados/modal/modal.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  loading = false;
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private loginService:LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  redefinir(){
    this.loading = true;
    this.loginService.resetSenha(this.email)
      .subscribe(response =>{
        this.loading = false;
        this.snackBar.open('Email de redefinição enchaminhado para '+this.email, "Sucesso", {duration:7000});
      },  err =>{
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']==422){
          msg = "Erro ao resetar a senha, verifique o email digitado.";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }

}

