import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthBlockComponent } from './auth-block/auth-block.component';



@NgModule({
  declarations: [LoginComponent, AuthComponent, AuthBlockComponent],
  imports: [
    ThemeModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
