import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from 'src/app/model/arquivo';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {


  public dados: any;
  public loading = false;
  formArquivo: FormGroup;
  formData = new FormData();
  imagem: File;
  arquivo: Arquivo;
  url: any;

  constructor(
    public dialogRef: MatDialogRef<FotoComponent>,
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
  }

  salvar() {
    this.loading = true;
     this.filiadoService.uploadImagemCamp(this.formData, this.dados.id)
      .subscribe(response => {
        this.loading = false;
        if (response) {
          this.snackBar.open("Upload realizado com sucesso", "Sucesso", { duration: 5000 });
          this.onNoClick();
        }
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err) {
          msg = "Erro ao anexar imagem.";
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      });
  }

  setImagem() {
    this.formData = new FormData();
    this.formData.append('file', this.imagem);
  }

  onFileSelected(file: File) {
    this.formData.append('file', file);
    this.url = URL.createObjectURL(file);
    var reader = new FileReader();
    this.url = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
