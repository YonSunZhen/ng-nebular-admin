import { Injectable } from '@angular/core';
import { LoginApi } from '../api/auth/login-api';
import { DHCrypto } from '../core/utils/dhCrypto';
import { LocalStorage } from '../core/utils/local.storage';

declare let require;
const CryptoJS = require('crypto-js');


@Injectable()
export class LoginService {

  constructor(private loginApi: LoginApi) { }

  async login(userUid: string, password: string) {
    //获取公钥对象信息
    const publicKeyResult = await this.loginApi.getPublicKey();
    if (!publicKeyResult['success']) {
      return publicKeyResult;
    }
    const pubN = publicKeyResult['body']['pubN'];
    const modN = publicKeyResult['body']['modN'];
    const sPubResultN = publicKeyResult['body']['sPubResultN'];
    //计算并验证私钥
    const dHCrypto = new DHCrypto();
    dHCrypto.setPublicKey(pubN, modN);
    const cPubResultN = dHCrypto.getCPubResultN();
    const secretKey = dHCrypto.generateSecretKey(sPubResultN).toString();
    const cSecretKeyHash = CryptoJS.SHA1(secretKey).toString(CryptoJS.enc.Hex);
    const confirmSecretKey = await this.loginApi.confirmSecretKey(userUid, cPubResultN, cSecretKeyHash);
    console.log('11111111');
    console.log(confirmSecretKey);
    if (!confirmSecretKey['success']) {
      return confirmSecretKey;
    }
    //获取access_token
    const pwdHash = CryptoJS.AES.encrypt(password, secretKey).toString();
    const result = await this.loginApi.getToken(userUid, pwdHash);
    // 如果验证登录成功 => 将登录状态记录至localstorage
    if (result['success']) {
      this.saveUserInfoToLocalStorage(result['body']);
    }
    return result;
  }

  // 退出登录
  async logOut(userUid, accessToken) {
    const data = await this.loginApi.logOut(userUid, accessToken);
    if (data['success'] === false) {
      console.error(data);
      return false;
    }
    this.clearUserInfoToLocalStorage();
    return true;
  }

  //检查是否已经登录
  isLoggedIn() {
    if (LocalStorage.get('access_token')) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * 存储用户信息至localStorage
   */
  saveUserInfoToLocalStorage(userInfo) {
    LocalStorage.set('department', userInfo['department']);
    LocalStorage.set('userUid', userInfo['user_uid']);
    LocalStorage.set('userName', userInfo['cn']);
    LocalStorage.set('avatar', 'data:image/png;base64,' + userInfo['avatar']);
    LocalStorage.set('access_token', userInfo['access_token']);
    LocalStorage.set('devicePermission', userInfo['device_permission']);
    LocalStorage.set('journeyPermission', userInfo['journey_permission']);
    LocalStorage.set('activityPermission', userInfo['activity_permission']);
    LocalStorage.set('addMealPermission', userInfo['add_meal_permission']);
    LocalStorage.set('visitorRegisterPermission', userInfo['visitor_register_permission']);
    LocalStorage.set('visitorMealPermission', userInfo['visitor_meal_permission']);
    LocalStorage.set('repairPermission', userInfo['repair_permission']);
    LocalStorage.set('bookPermission', userInfo['book_permission']);
    LocalStorage.set('waterPermission', userInfo['water_permission']);
    LocalStorage.set('dqDevicePermission', userInfo['dq_device_permission']);
    LocalStorage.set('photographyPermission', userInfo['photography_permission']);
    LocalStorage.set('superAdminPermission', userInfo['super_admin_permission']);

  }

  /**
   * 清除localStorage中相关用户信息
   */
  clearUserInfoToLocalStorage() {
    LocalStorage.remove('department');
    LocalStorage.remove('userUid');
    LocalStorage.remove('userName');
    LocalStorage.remove('avatar');
    LocalStorage.remove('access_token');
    LocalStorage.remove('addMealPermission');
    LocalStorage.remove('journeyPermission');
    LocalStorage.remove('activityPermission');
    LocalStorage.remove('devicePermission');
    LocalStorage.remove('visitorRegisterPermission');
    LocalStorage.remove('visitorMealPermission');
    LocalStorage.remove('repairPermission');
    LocalStorage.remove('bookPermission');
    LocalStorage.remove('waterPermission');
    LocalStorage.remove('dqDevicePermission');
    LocalStorage.remove('photographyPermission');
    LocalStorage.remove('superAdminPermission');
  }

}
