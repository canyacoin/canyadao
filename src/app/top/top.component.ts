import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css'],
})
export class TopComponent implements OnInit {

  constructor(private router: Router, private walletService: WalletService) { }


  ngOnInit() {



    setTimeout( () => {

    }, 2000

  );
    // removes the backdrop on link click
    $('.nav-link').click(function() {
        $('.topbar-backdrop').click();
    });
  }

  AfterViewInit(){
    this.getAddress();
  }

  getAddress(): string{
    return this.walletService.getAddressStub();
  }

  getWalletBool(): boolean{
    return this.walletService.walletBool;
  }

  getWalletNone(): boolean{
    return this.walletService.walletNone;
  }
}
