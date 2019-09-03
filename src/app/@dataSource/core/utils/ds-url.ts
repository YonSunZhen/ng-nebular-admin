import { DefaultUrlSerializer, UrlTree, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { HOST_URL_V2 } from '../../api/api.url';
const PG_URL_SERIALIZER = new DefaultUrlSerializer();
const PG_DEFAULT_SCHEME = 'http';

// 这是一个类 里面有很多方法
export class DsURL {
    private _url: UrlTree;
    private _scheme = '';
    // url:https://itc.desaysv.com/api/develop/v2/wx
    constructor(url: string | DsURL) {
        const _u = (typeof url === 'string') ? url : (url as DsURL).value();
        if (_u.trim() === '') {
            throw new Error('URL is empty!');
        }
        const _s = _u.split('://');
        if (_s.length === 1) {
            this._scheme = PG_DEFAULT_SCHEME;
            this._url = PG_URL_SERIALIZER.parse(_s[0]); // 序列化URL
        } else if (_s.length === 2) {
            this._scheme = _s[0];
            this._url = PG_URL_SERIALIZER.parse(_s[1]);
        } else {
            throw new Error('URL with multi "://" is not supported!');
        }
    }

    clone(): DsURL {
        return new DsURL(this);
    }
    // 在尾部添加参数
    // PRIMARY_OUTLET就是代表primary
    push(segment: string): DsURL {
        this._url.root.children[PRIMARY_OUTLET].segments.push(new UrlSegment(segment, {}));
        return this;
    }

    pop(): DsURL {
        this._url.root.children[PRIMARY_OUTLET].segments.pop();
        return this;
    }

    params(obj: object): DsURL {
        Object.assign(this._url.queryParams, obj);
        return this;
    }

    param(key: string, value: string): DsURL {
        this._url.queryParams[key] = value;
        return this;
    }

    clear(key?: string): DsURL {
        if (key) {
            delete this._url.queryParams[key];
        } else {
            this._url.queryParams = {};
        }
        return this;
    }

    // 将DsURL再转变为对应的URL字符串
    value(): string {
        return `${this._scheme}:/${PG_URL_SERIALIZER.serialize(this._url)}`;
    }
}

export const DS_HOST_URL = () => new DsURL(HOST_URL_V2);

