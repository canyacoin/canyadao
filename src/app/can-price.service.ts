import { Injectable } from '@angular/core';
import { debug } from 'util';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class CanPriceService {
private _account: string = null;
private _tokenContract: any;


constructor() {
}

/** JSON Parser */
getJSON(url) {
  let resp;
  let xmlHttp;
  resp = '';
  xmlHttp = new XMLHttpRequest();
  if (xmlHttp != null) {
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    resp = xmlHttp.responseText;
  }
  return JSON.parse(resp);
}

getCANPrice() {
  const cmcApi = 'https://api.coinmarketcap.com/v1/ticker/canyacoin/';
  const result = (this.getJSON(cmcApi));
  return Math.floor(result[0].price_usd);
}

getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
  const etherscanApi = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='; // the API link.
  const etherscanApiToken = etherscanApi + tokenAddress; // change this value if you want to use other token.
  const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
  const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
  return result;
}

}
