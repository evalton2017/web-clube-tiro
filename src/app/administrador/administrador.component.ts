import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  loading = false;
  quantidade_filiado = 0;
  quantidade_competidor = 0;
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.quantidadeFiliado();
    this.quantidadeCompetidores();
  }
 
  quantidadeFiliado(){
    this.loading = true;
    this.adminService.quantidadeFiliado()
      .subscribe(response =>{
        if (response){
          this.quantidade_filiado = response.result[0].quantidade;
        }
      },  err =>{
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status']==422){
          msg = "Erro ao consultar a quantidade de filiados.";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }
  
  quantidadeCompetidores(){
    this.loading = true;
    this.adminService.quantidadeCompetidor()
      .subscribe(response =>{
        if(response){
          this.quantidade_competidor = response.result[0].quantidade;
        }
      },  err =>{
        this.loading = false;
        let msg: string = err.error.text;
        if(err['status']===422){
          msg = "Erro ao consultar a quantidade de Competidores.";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      });
  }

}
