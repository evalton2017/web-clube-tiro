import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../auth.guard';
import { AdministradorComponent } from './administrador.component';
import { TemplateComponent } from './template/template.component';
import {FiliadosComponent} from './filiados/filiados.component';
import { CompetidoresComponent } from './competidores/competidores.component';
import { RequerimentoComponent } from './requerimento/requerimento.component';
import { PdfComponent } from './requerimento/pdf/pdf.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { InscritosComponent } from './campeonato/inscritos/inscritos.component';

const routes: Routes = [  
  {canActivate : [AuthGuard],
    path: 'admin',component: TemplateComponent,
    children:[
      {path: '',component: AdministradorComponent},
      {path: 'filiados',component: FiliadosComponent},
      {path: 'competidores',component: CompetidoresComponent},
      {path: 'filiado/requerimento',component: RequerimentoComponent},
      {path: 'filiado/requerimento/:pdf',component: PdfComponent},
      {path: 'campeonatos',component: CampeonatoComponent},
      {path: 'campeonatos/inscritos',component: InscritosComponent}
    ]
  },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
