import { Component, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { Perfil } from 'src/app/model/pefil';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';
import { adminLteConf } from '../adminLteConf';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  loading = true;
  pessoa: Pessoa;
  filiado: Filiado;
  email: string;
  public dados: any;
  public menus;
  public sbmenuclass = '';
  public active_menu = 'menu_ativo';

  constructor(
    private usuarioSession: UserSessionService,
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.pessoa = new Pessoa();
    this.filiado = new Filiado()
    this.dados = this.usuarioSession.obterDadosUsuario();
  }

  ngOnInit(): void {
    this.getEmail();
    this.montarMenu();
    this.verificaToken();
  }

  getEmail(){
    this.email = this.dados.email;
    this.carregar();
  }

  carregar(){
    setTimeout(() => {
     this.loading = false;
    }, 2000);
  }  


  logout(){
    delete localStorage['token'];
    delete localStorage['user'];
    this.router.navigate(['']);
  }

  verificaToken(){
    let tempo = 24;
    setInterval(() => {
      if(tempo<2){
        this.snackBar.open("Token expirado, favor faça novo Login.", "Info", {duration:5000});
        this.logout();
      }
      tempo--;
    }, 60000);
  }

  montarMenu(){
      if(this.dados.rules[0].Filiado!= undefined && this.dados.rules[0].Ativo){
        this.menus = [  {label: ' Home', route: '/filiado', iconClasses: 'fa fa-home' },
        {label: ' MEUS DADOS', route: '/filiado/cadastro', iconClasses: 'fa fa-user'},
        {label: ' CAMPEONATOS', iconClasses: 'fa fa-trophy', action:'treeview', children:[
          {label: ' Campeonatos', route: 'campeonatos', iconClasses: 'fa fa-trophy'},
          {label: ' Inscricões', route: 'campeonato/incricao', iconClasses: 'fa fa-id-badge'},
        ]},
        {label: ' REQUERIMENTOS', iconClasses: 'fa fa-id-badge',action:'treeview', children:[
          {label: 'Aquisição Arma', route: '/filiado/requerimento', iconClasses: 'fa fa-id-badge'},
          {label: ' Solicitações', route: '/filiado/solicitacoes/requerimento', iconClasses: 'fa fa-id-card'},
          {label: ' Anexos', route: '#', iconClasses: 'fa fa-id-card'},
        ]},
          {label: ' CONTATO', route: 'filiado/contato', iconClasses: 'fa  fa-at'},
          ]
      }
  
      else if(this.dados.rules[0].Filiado != undefined && this.dados.rules[0].Ativo==false){
        this.menus = [  {label: ' CONCLUIR CADASTRO', route: '/filiado/cadastro', iconClasses: 'fa fa-home' }]
      }
  
      else if(this.dados.rules[0].Competidor != undefined){
        this.menus = [  {label: ' Home', route: '/filiado', iconClasses: 'fa fa-home' },
        {label: ' MEUS DADOS', route: '/filiado/cadastro', iconClasses: 'fa fa-user'},
        {label: ' CAMPEONATOS', iconClasses: 'fa fa-trophy', action:'treeview', children:[
          {label: ' Campeonatos', route: 'campeonatos', iconClasses: 'fa fa-trophy'},
          {label: ' Inscricões', route: 'campeonato/incricao', iconClasses: 'fa fa-id-badge'},
        ]},
       ]
      }
    
    }

    abrirSubMenu(i: any){
      if(this.menus[i].action == 'treeview'){
        this.menus[i].action= 'nav-item active treeview';
      }else{
        this.menus[i].action= 'treeview';
      }
    }
}
