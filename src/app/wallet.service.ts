import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public wallet: string = '';
  public walletBool: boolean = false;
  public walletNone: boolean = true;

  constructor() { }

  setWallet(wallet): void{
    this.wallet = wallet;
    this.walletBool = true;
    this.walletNone = false;
  }
  forgetWallet(): void{
    this.wallet = '';
    this.walletBool = false;
    this.walletNone = true;
  }
  getWallet(): string {
    return this.wallet;
  }

  getWalletBool(): boolean {
    return this.walletBool;
  }

  getWalletNone(): boolean {
    return this.walletNone;
  }

  OnInit(){
    this.wallet = '';
  }
}
