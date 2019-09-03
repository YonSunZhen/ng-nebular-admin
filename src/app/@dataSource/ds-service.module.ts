import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginService } from './services/login.service';
import { LoginApi } from './api/auth/login-api';

const PANGOOSERVICE_PROVIDERD = [
  LoginService
];
//那些api也相当于service需要在根模块注入
const PANGOOAPI_PROVIDERD = [
  LoginApi
]

@NgModule({
  imports: []
})
export class DsServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DsServiceModule,
      providers: [
        ...PANGOOSERVICE_PROVIDERD,
        ...PANGOOAPI_PROVIDERD
      ]
    }
  }
}
