import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
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
import { NgxLoadingModule } from 'ngx-loading';


const maskConfig: Partial<IConfig> = {
  validation: false,
};
 
@NgModule({
  declarations: [
      LoginComponent,
      CadastroComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
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
    NgxLoadingModule.forRoot({}),
    LoginRoutingModule,

  ]
})
export class LoginModule { }
