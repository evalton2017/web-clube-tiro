import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { DataPipe } from './pipes/data.pipe';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';


@NgModule({
  declarations: [
    MascaraDirective,
    DataPipe
],
  exports: [
    MascaraDirective,
    DataPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
   PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
