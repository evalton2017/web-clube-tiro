import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AdminService } from '../../service/admin.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  public filiado: Filiado;
  public dados: any;
  public loading = false;

  constructor(  
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private snackBar: MatSnackBar,
    private adminService:AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    ) {
      this.filiado = new Filiado();
     }

  ngOnInit(): void {
    this.dados = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  desativar(email: any){
    console.log(email);
    this.loading = true;
    this.adminService.desativarFiliado(email)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Filiado Desativado com sucesso.", "Sucesso", { duration: 5000 });
        this.onNoClick();
      },
      err =>{
        this.loading = false;
        const msg: string = "Erro ao desativar Filiado.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )
  }

  ativar(email){
    console.log("ativar");
    this.loading = true;
    this.adminService.ativarFiliado(email)
    .subscribe(
      response =>{
        this.loading = false;
        this.snackBar.open("Filiado Ativado com sucesso.", "Sucesso", { duration: 5000 });
        this.onNoClick();
      },
      err =>{
        console.log(err);
        this.loading = false;
        const msg: string = "Erro ao desativar Filiado.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    )

  }

}
