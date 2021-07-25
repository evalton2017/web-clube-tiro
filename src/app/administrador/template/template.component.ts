import { Component, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filiado } from 'src/app/model/filiado';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { UserSessionService } from 'src/app/shared/user-session.service';

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

  montarMenu(){
  
        this.menus = [  {label: ' HOME', route: '/admin', iconClasses: 'fa fa-home' },
        {label: ' FILIADOS', iconClasses: 'fa fa-users', action:'treeview', children:[
          {label: '  Filiados', route: 'filiados', iconClasses: 'fa fa-users'},
          {label: '  Requerimentos', route: 'filiado/requerimento', iconClasses: 'fa fa-id-card-alt'},
        ]},
        {label: ' COMPETIDORES', iconClasses: 'fa fa-users', action:'treeview', children:[
          {label: ' Competidores', route: 'competidores', iconClasses: 'fa fa-users'}
        ]},
        {label: ' CAMPEONATOS', iconClasses: 'fa fa-id-badge', action:'treeview', children:[
          {label: ' Campeonato', route: '/admin/campeonatos', iconClasses: 'fa fa-trophy'},
          {label: ' Inscritos', route: 'campeonatos/inscritos', iconClasses: 'fa fa-id-badge'},
         
        ]}
        ]    
    
    }

    abrirSubMenu(i: any){
      if(this.menus[i].action == 'treeview'){
        this.menus[i].action= 'nav-item active treeview';
      }else{
        this.menus[i].action= 'treeview';
      }
    }
   
}
