import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NotFoundComponent
  ],
  imports: [
    PagesRoutingModule,
    NbMenuModule,
    ThemeModule
  ]
})
export class PagesModule { }
