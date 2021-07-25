import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Campeonato } from 'src/app/model/campeonato';
import { Divisao } from 'src/app/model/divisao';
import { Modalidade } from 'src/app/model/modalidade';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { AdminService } from '../../service/admin.service';
import { DatePipe } from '@angular/common';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';


@Component({
  selector: 'app-cadastro-camp',
  templateUrl: './cadastro-camp.component.html',
  styleUrls: ['./cadastro-camp.component.css']
})
export class CadastroCampComponent implements OnInit {

  public dados: any;
  public loading = false;
  campeonato: Campeonato;
  campeonatoForm: FormGroup;
  modalidades: Modalidade[] = [];
  modalidade: Modalidade;
  divisoes: Divisao[] = [];
  editar = false;

  constructor(
    public dialogRef: MatDialogRef<CadastroCampComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioSession: UserSessionService,
    private datePipe: DatePipe
  ) {
    this.campeonato = new Campeonato();
  }

  ngOnInit(): void {
    this.dados = this.data;
    if (this.dados != null) {
      this.editar = true;
      this.editarForm(this.dados);
    } else {
      this.gerarForm();
    }
    this.listaModalidades();
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  gerarForm() {
    this.campeonatoForm = this._formBuilder.group({
      id:[''],
      nome: ['', Validators.required],
      foto: [''],
      inicio: [''],
      fim: ['', Validators.required],
      temporada: [''],
      modalidade: [''],
      valor: ['']
    });
  }

  editarForm(campeonato: any){
    this.campeonatoForm = this._formBuilder.group({
      id:[campeonato.id],
      nome: [campeonato.nome, Validators.required],
      foto: [campeonato.foto],
      inicio: [this.converteDate(campeonato.inicio)],
      fim: [this.converteDate(campeonato.fim), Validators.required],
      temporada: [campeonato.temporada],
      modalidade: [campeonato.modalidades[0].id],
      valor: [campeonato.valor, ]
    });
    this.divisoes = [];
    this.divisoes = campeonato.modalidades[0].divisoes;
  }

  salvar() {
    this.loading = true;
    this.setCampeonato();
    this.adminService.cadastrarCampeonato(this.campeonato)
      .subscribe(response => {
        this.loading = false;
        this.snackBar.open("Campeonato cadastrado com sucesso.", "Sucesso", { duration: 5000 });
        this.dialogRef.close();
        this.ngOnInit();
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        console.log(err);
        if (err['status'] == 401) {
          msg = "Erro ao salvar campeoanato";
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      })

  }

  listaModalidades() {
    this.loading = true;
    this.adminService.listaModalidade()
      .subscribe(response => {
        this.loading = false;
        if (response.retorno) {
          this.modalidades = response.retorno;
        }
      }, err => {
        this.loading = false;
        let msg: string = err.error.text;
        if (err['status'] == 401) {
          msg = "Erro ao listar modalidades";
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      })
  }

  listaDivisao(modalidade: any) {
    this.divisoes = [];
    this.divisoes = modalidade.divisoes;
  }

  setCampeonato() {
    if (this.campeonatoForm.value.id != null && this.campeonatoForm.value.id != '' ){
       this.campeonato.id = this.campeonatoForm.value.id;
    }
    this.campeonato.inicio = this.campeonatoForm.value.inicio;
    this.campeonato.fim = this.campeonatoForm.value.fim;
    this.campeonato.nome = this.campeonatoForm.value.nome;
    this.modalidades.forEach((m)=>{
      if (m.id==this.campeonatoForm.value.modalidade){
        this.campeonato.modalidades.push(m)
      }
    });  
    this.campeonato.temporada = this.campeonatoForm.value.temporada;
    if (typeof(this.campeonatoForm.value.valor)=='string') {
      this.campeonato.valor = parseFloat(this.campeonatoForm.value.valor);
    }else{
      this.campeonato.valor = this.campeonatoForm.value.valor.toFixed(2);
    }
   
  }

  validarData() {
    let dataInicial = this.campeonatoForm.value.inicio;
    let dataFinal = this.campeonatoForm.value.fim;
    let hoje = this.converteDate(new Date());

    if (dataInicial > dataFinal) {
      this.snackBar.open('Data Inicial deve ser maior que a data final.', "Erro", { duration: 5000 });
      this.campeonatoForm.patchValue({
        fim: ['']
      })
    }
    if (dataFinal < hoje) {
      this.snackBar.open('Data Inicial deve ser maior que a data atual.', "Erro", { duration: 5000 });
      this.campeonatoForm.patchValue({
        fim: ['']
      })
    }
  }

  converteDate(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }


}
