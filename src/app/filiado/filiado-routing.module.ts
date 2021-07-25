import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FiliadoComponent } from './filiado.component';
import { TemplateComponent } from './template/template.component';
import {AuthGuard} from '../auth.guard';
import { RequerimentoComponent } from './requerimento/requerimento.component';
import { SolicitacaoComponent } from './requerimento/solicitacao/solicitacao.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { ListarComponent } from './campeonato/inscricao/listar/listar.component';
import { ContatoComponent } from './contato/contato.component';


const routes: Routes = [
  
  {canActivate : [AuthGuard],
    path:'filiado', component: TemplateComponent,
  children:[
    {path:'', component: FiliadoComponent},
    {path:'cadastro', component: CadastroComponent},
    {path:'requerimento', component: RequerimentoComponent},
    {path:'solicitacoes/requerimento', component: SolicitacaoComponent},
    {path:'campeonatos', component: CampeonatoComponent},
    {path:'campeonato/incricao', component: ListarComponent},
    {path:'filiado/contato', component: ContatoComponent}
  ]},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiliadoRoutingModule { }
