import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../@dataSource/services/login.service';
import { Router } from '@angular/router';
// import { AuthGuardService } from '../auth-guard.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false; // 加载条是否出现
  user: any = {
    userName: '',
    password: ''
  };
  constructor(
    private dsLoginSVC: LoginService,
    protected ngRouter: Router) { }

  ngOnInit() {
  }

  async login(userName, pwd) {
    this.loading = true;
    const params = {
      'userName': userName,
      'password': pwd
    };
    const result = await this.dsLoginSVC.login(userName, pwd);
    this.loading = false;
    if (result['success']) {
      this.ngRouter.navigate(['./pages']);
    }
  }

}
