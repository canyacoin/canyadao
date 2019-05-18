import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public wallet: string = '';
  public walletBool: boolean = false;
  public walletNone: boolean = true;
  public balance: number;
  public staked: number;

  constructor() { }

  setWallet(wallet): void{
    this.wallet = wallet;
    this.walletBool = true;
    this.walletNone = false;
    this.balance = 102345.34;
    this.staked = 0;
  }
  forgetWallet(): void{
    this.wallet = '';
    this.walletBool = false;
    this.walletNone = true;
  }
  getWallet(): string {
    return this.wallet;
  }

  getBalance(): number {
    return this.balance;
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
    this.wallet = '';
  }
}
