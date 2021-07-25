import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeModuleModule } from './home/home-module.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {LoginModule} from './login/login-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FiliadoModule } from './filiado/filiado.module';
import { NgxLoadingModule } from 'ngx-loading';
import { TokenInterceptor } from './token.interceptor';
import { LightboxModule } from 'ngx-lightbox';
import { AdminModule } from './administrador/admin.module';
import { ResetComponent } from './login/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModuleModule,
    //MODULOS DO SISTEMA
    LoginModule,
    FiliadoModule,
    //MODULOS DO MATERIAL
    MatToolbarModule,
    MatIconModule,      
    NgxLoadingModule.forRoot({}),
    LightboxModule,
    AdminModule,
    AppRoutingModule,
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
