import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DS_HOST_URL } from '../../core/utils/ds-url';
const APPID = 'wxmanagersystem'; // 后台管理系统标识符

@Injectable()
export class LoginApi {
    // 在请求域名的后面添加参数login
    baseUrl = DS_HOST_URL().clone().push('login');
    constructor(private http: HttpClient) { }

    // 获取服务端的公钥信息
    getPublicKey() {
        const url = this.baseUrl.clone().push('publicKey').value();
        //toPromise后返回的是一个promise对象
        return this.http.get(url).toPromise();
    }

    //验证密钥和服务器的密钥是否一致
    confirmSecretKey(userUid: string, cPubResultN: number,
        cSecretKeyHash: number) {
        const paramsData = {
            pub_result_n: cPubResultN,
            secret_key_hash: cSecretKeyHash,
            user_uid: userUid,
            appid: APPID
        };
        const url = this.baseUrl.clone().push('secret_key').value();
        return this.http.put(url, paramsData).toPromise();//这里为什么用put(一般用来更改数据)
    }

    //获取token 用来记录登录状态
    getToken(_userUid, pwdHash) {
        const url = this.baseUrl.clone().push('token').value();
        const paramsData = {
            user_uid: _userUid,
            passwd: pwdHash,
            appid: APPID
        };
        return this.http.put(url, paramsData).toPromise();
    }

    //退出登录
    logOut(userUid, accessToken) {
        const url = this.baseUrl.clone().push('logout').value();
        const paramsData = {
            user_uid: userUid,
            access_token: accessToken,
            appid: APPID
        };
        return this.http.put(url, paramsData);
    }
}
