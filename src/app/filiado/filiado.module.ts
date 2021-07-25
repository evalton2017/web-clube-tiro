import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from  '@angular/material/radio';
import {MatGridListModule} from  '@angular/material/grid-list';
import {MatListModule} from  '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FiliadoComponent } from './filiado.component';
import { FiliadoRoutingModule } from './filiado-routing.module';
import { LayoutModule } from 'angular-admin-lte'; 
import { adminLteConf } from './adminLteConf';
import { TemplateComponent } from './template/template.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {DatePipe} from '@angular/common';;
import { RequerimentoComponent } from './requerimento/requerimento.component';
import { SolicitacaoComponent } from './requerimento/solicitacao/solicitacao.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FotoComponent } from './foto/foto.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { InscricaoComponent } from './campeonato/inscricao/inscricao.component';
import { ListarComponent } from './campeonato/inscricao/listar/listar.component';
import { ContatoComponent } from './contato/contato.component';


registerLocaleData(localePt);

const maskConfig: Partial<IConfig> = {
  validation: false,
};
 
@NgModule({
  declarations: [
      FiliadoComponent,
      TemplateComponent,
      CadastroComponent,
      RequerimentoComponent,
      SolicitacaoComponent,
      FotoComponent,
      CampeonatoComponent,
      InscricaoComponent,
      ListarComponent,
      ContatoComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    //ANGULAR MATERIAL
    MatStepperModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,  
    MatIconModule, 
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    //CONFIGURAÇÃO ADMINLTE
    LayoutModule.forRoot(adminLteConf),
    NgxLoadingModule,
    FiliadoRoutingModule,

  ],

  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt'}],
})
export class FiliadoModule { }
