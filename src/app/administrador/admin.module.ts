import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LayoutModule } from 'angular-admin-lte'; 
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdministradorComponent } from './administrador.component';
import { AdminRoutingModule } from './admin-routing.module';
import {adminLTeConfigAdmin} from './adminLTeConfigAdmin';
import { TemplateComponent } from './template/template.component';
import { FiliadosComponent } from './filiados/filiados.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModalComponent } from './filiados/modal/modal.component';
import { CompetidoresComponent } from './competidores/competidores.component';
import { ViewComponent } from './competidores/view/view.component';
import { RequerimentoComponent } from './requerimento/requerimento.component';
import { PdfComponent } from './requerimento/pdf/pdf.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { CadastroCampComponent } from './campeonato/cadastro-camp/cadastro-camp.component';
import {MatSelectModule} from '@angular/material/select';
import { ImagemComponent } from './campeonato/imagem/imagem.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { InscritosComponent } from './campeonato/inscritos/inscritos.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
 
@NgModule({
  declarations: [
      AdministradorComponent,
      TemplateComponent,
      FiliadosComponent,
      ModalComponent,
      CompetidoresComponent,
      ViewComponent,
      RequerimentoComponent,
      PdfComponent,
      CampeonatoComponent,
      CadastroCampComponent,
      ImagemComponent,
      InscritosComponent,
      
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
    MatSelectModule,
    //CONFIGURAÇÃO ADMINLTE
    LayoutModule.forRoot(adminLTeConfigAdmin),
    NgxLoadingModule,
    CurrencyMaskModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
