declare let require;
const CryptoJS = require('crypto-js');

/**
 * 生成[0,n]区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，getRandomN(100)
 */
function getRandomN(roundTo: number) {
  return Math.round(Math.random() * roundTo);
}

/**
 * 生成指定区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，getRandomNM(0,100)
 */
function getRandomNM(n, m) {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

/**
 * pubN:从服务器获取的公钥数字(允许公开)
 * modN:从服务器获取的公钥数字(允许公开)
 * cPrivN:客户端随机生成的私钥数字(不可公开)
 * cPubResultN:客户端计算得出公钥结果(允许公开,发送给服务器)
 * cKeyN:协商出来的密钥数字(不可公开),客户端和服务器一致
 * cSecretKey:根据协商出来的密钥数字进行hash得出的密钥串(不可公开)
 */
export class DHCrypto {
  private pubN: number;
  private modN: number;
  private cPrivN: number = getRandomNM(1, 99999);
  private cPubResultN: number;
  private cKeyN: number;
  private cSecretKey: string;

  setPublicKey(_pubN: number, _modN: number) {
    this.pubN = _pubN;
    this.modN = _modN;
    this.cPrivN = getRandomNM(1, 99999);
    while (this.cPrivN % this.modN === 0 || this.modN % this.cPrivN === 0) {
      this.cPrivN = getRandomNM(1, 99999);
    }
    this.cPubResultN = this.pubN * this.cPrivN % this.modN;
  }

  getPubN() {
    return this.pubN;
  }

  getModN() {
    return this.modN;
  }

  getCPubResultN() {
    return this.cPubResultN;
  }

  generateSecretKey(_sPubResultN: number) {
    if (!_sPubResultN) {
      console.error('error:_sPubResultN is must be number.');
      return '';
    }
    let cKeyN = _sPubResultN * this.cPrivN % this.modN;
    cKeyN = cKeyN + this.modN + 1;
    const cSecretKey = CryptoJS.SHA1(cKeyN.toString()).toString(CryptoJS.enc.Hex);
    return cSecretKey;
  }

}

