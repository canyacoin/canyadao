import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  id = 0;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
  }

  setID(id): void {
    this.id = id;
  }

  getWallet(): string{
    return this.walletService.getWallet();
  }

  getWalletBool(): boolean{
    return this.walletService.walletBool;
  }

  getWalletNone(): boolean{
    return this.walletService.walletNone;
  }

  forgetWallet(): void{
    this.walletService.forgetWallet();
  }

}
