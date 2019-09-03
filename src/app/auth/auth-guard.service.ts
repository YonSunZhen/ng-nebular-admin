import { Injectable } from '@angular/core';
import {
  CanLoad,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../@dataSource/services/login.service';
import { LocalStorage } from '../@dataSource/core/utils/local.storage';
import { NbDialogService } from '@nebular/theme';
import { AlertModalComponent } from '../pages/modals/alert/alert-modal.component';

//@Injectable() 装饰器把它标记为可供注入的服务
// 为什么注释了没报错
@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {

  constructor(
    private dsLoginSVC: LoginService,
    private ngRouter: Router,
    private nbDialogService: NbDialogService) { }

  canLoad(): boolean {
    if (this.dsLoginSVC.isLoggedIn()) {
      return true;
    } else {
      this.ngRouter.navigate(['./auth']);
      return false;
    }
  }

  /**
   * 
   * @param route 包含与当前组件相关的路由的当前瞬间信息
   * @param state 可以获取到访问路径的url(这是一个由活动路由的快照组成的树。本树中的每个节点都会知道 "已消费的" URL 片段、已提取出的参数和已解析出的数据)
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if (!this.checkModulePermission(state)) {

    // }
    this.nbDialogService.open(AlertModalComponent,
      {
        context: {
          content: '没有管理权限!'
        }
      });
    return false;
  }


  // 检查是否有权限进入该模块
  checkModulePermission(state: RouterStateSnapshot) {
    //state.url: "/pages/layout/tab"
    const moduleUrl = /pages\/([^/]*)\//.exec(state.url);
    const moduleName = moduleUrl ? moduleUrl[1] : null;
    if (moduleName === 'car-sharing') {
      return LocalStorage.get('journeyPermission') === '1';
    }
    if (moduleName === 'device') {
      return LocalStorage.get('devicePermission') === '1';
    }
    if (moduleName === 'visitor-register') {
      return LocalStorage.get('visitorRegisterPermission') === '1';
    }
    if (moduleName === 'books-manage') {
      return LocalStorage.get('bookPermission') === '1';
    }
    if (moduleName === 'repair') {
      return LocalStorage.get('repairPermission') === '1';
    }
    if (moduleName === 'dq-device') {
      return LocalStorage.get('dqDevicePermission') === '1';
    }
    if (moduleName === 'water') {
      return LocalStorage.get('waterPermission') === '1';
    }
    if (moduleName === 'photography') {
      return LocalStorage.get('photographyPermission') === '1';
    }
    if (moduleName === 'api-visit-show') {
      return LocalStorage.get('superAdminPermission') === '1';
    }
    return true;
  }
}
