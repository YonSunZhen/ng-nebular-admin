import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [
    TabComponent,
    ListComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
