import { Injectable, OnInit } from '@angular/core';

declare const require: any;
var BnbApiClient = require('@binance-chain/javascript-sdk');
const axios = require('axios');

import { BNBCHAIN } from './dataChain';
import { ETHCAN } from './dataChain';


@Injectable({
  providedIn: 'root'
})

export class WalletService {

  public privateKey: string;
  public mnemonic: string;
  public address: string;
  public addressStub: string;

  public walletBool: boolean = false;
  public walletNone: boolean = true;
  public balBNB: number;
  public balance: number;
  public staked: number;

  dataChain = BNBCHAIN;
  ethCAN = ETHCAN;

  public bnbClient;

  constructor() {
  this.setClient()
}

async setClient(){
  this.bnbClient = new BnbApiClient(this.dataChain.api);
  this.bnbClient.initChain(this.dataChain.name);
}

checkMnemonic(phrase): boolean {
      return BnbApiClient.crypto.validateMnemonic(this.mnemonic);
    }

  setPrivateKey(phrase){
    this.mnemonic = phrase;
    this.privateKey = BnbApiClient.crypto.getPrivateKeyFromMnemonic(phrase);
    this.address = BnbApiClient.crypto.getAddressFromPrivateKey(this.privateKey);
    this.setAddressStub();
    this.walletBool = true;
    this.walletNone = false;
    this.queryBalance();
  }

  setAddressStub(){
    const rightStr = this.address.substr(-3,3);
    console.log(rightStr);
    const leftStr = this.address.substr(0,8);
    console.log(leftStr);
    this.addressStub = leftStr.concat('...', rightStr);
    console.log(this.addressStub);
  }

  setWallet(key): void{
  }

  forgetAddress(): void{
    this.address = '';
    this.walletBool = false;
    this.walletNone = true;
    this.balBNB = 0;
    this.balance = 0;
    this.staked = 0;
  }

  getAddress(): string {
    return this.address;
  }

  getAddressStub(): string {
    return this.addressStub;
  }

  getBalance(): number {
    return this.balance;
  }

  getBalBNB(): number {
    return this.balBNB;
  }

  getStaked(): number{
    return this.staked;
  }

  getWalletBool(): boolean {
    return this.walletBool;
  }

  getWalletNone(): boolean {
    return this.walletNone;
  }

  stake(amount){
    this.balance = this.balance - amount;
    this.staked = this.staked + amount;
  }

  unStake(amount){
    this.balance = this.balance + amount;
    this.staked = this.staked - amount;
  }

  withdrawAll(){
    this.balance = this.balance + this.staked;
    this.staked = 0;
  }



  OnInit(){
  }


async queryBalance(){
  const bnbClient = new BnbApiClient(this.dataChain.api);
  bnbClient.initChain(this.dataChain.name);
  bnbClient.setPrivateKey(this.privateKey);

  const balanceJSON = await bnbClient.getBalance(this.address)
  .then(result => {
    console.log(result);
    const bnbArray = result.find(bnbArray => bnbArray.symbol === this.dataChain.symB);
    this.balBNB = bnbArray.free;
    console.log('BNBbal:', this.balBNB);

    const canArray = result.find(canArray => canArray.symbol === this.dataChain.symC);
    this.balance = canArray.free;
    this.staked = canArray.frozen
    console.log('CANbal:', this.balance, 'CANfrozen:', this.staked);

    if (result.status === 200) {
      console.log('success', result.result[0].hash);
    } else {
      console.log('result', result);
    }

    if (result.status === 429) {
      console.log('Wait 2 minutes');
    }


    // return bal;
  })
    .catch((error) => {
      console.error('error', error);
    });
}


}
