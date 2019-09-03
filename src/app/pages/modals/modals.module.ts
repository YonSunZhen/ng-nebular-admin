import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert/alert-modal.component';
import { ThemeModule } from '../../@theme/theme.module';

const CONPONENTS = [
  AlertModalComponent
]

@NgModule({
  declarations: [...CONPONENTS],
  imports: [
    ThemeModule
  ],
  exports: [
    ...CONPONENTS
  ],
  entryComponents: [
    ...CONPONENTS
  ]
})
export class ModalsModule { }
