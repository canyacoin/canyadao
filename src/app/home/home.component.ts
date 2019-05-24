import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import { WalletService } from '../wallet.service';
import { Tier } from '../dataTier';
import { Member } from '../dataMember';
import { DaoService } from '../dao.service';

import { ETHCAN } from '../dataChain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  dataDAO: Tier[];
  memberDAO: Member;
  perks0 = []; perks1 = []; perks2 = [];  perks3 = [];

  // Flags
  loading = true;

  closeResult: string;

  //No Wallet Alert
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  public privatekey: string;
  public mnemonic: string;
  public address: string;

  ethCAN = ETHCAN;
  public canPrice: number;
  public canAmount: number;
  public daoFund;

  constructor(private router: Router,
    private activatedRoute:  ActivatedRoute,
    private modalService: NgbModal,
    private walletService: WalletService,
    private daoService: DaoService) {}


    ngOnInit() {

      setTimeout( () => {
        this.loading = false;
        this.checkWallet();
      }, 2000
    );
    $('#top-nav .nav-item a').css('color','#919d9d');


    setTimeout( () => {
      this.checkWallet();
    }, 5000
  );

  this.canPrice = this.ethCAN.canPrice;
  this.canAmount = this.ethCAN.canAmount;
  this.daoFund = this.canPrice * this.canAmount;
  console.log(this.daoFund);
  this.getDaoFund();
  this.perks0 = this.getPerks(0);
  this.perks1 = this.getPerks(1);
  this.perks2 = this.getPerks(2);
  this.perks3 = this.getPerks(3);



  // Alert Timer
  setTimeout(() => this.staticAlertClosed = true, 10000);
  this._success.subscribe((message) => this.successMessage = message);
  this._success.pipe(
    debounceTime(5000)
  ).subscribe(() => this.successMessage = null);

}

ngAfterViewInit(){

}

getStake(id): number {
  return this.daoService.getStake(id);
}

getName(id): string {
  return this.daoService.getName(id);
}

getPeriod(id): number {
  return this.daoService.getPeriod(id);
}

getPerks(id): string[] {
  return this.daoService.getPerks(id);
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

public navigate(url){
  this.router.navigate([url])
}


public checkWallet() {
  if (this.walletService.walletNone) {
    this._success.next(`Please Connect Your Wallet`);
  }

}

getDaoFund(): number{
  const result = (this.getJSON(this.ethCAN.cmcApi));
  this.canPrice = result[0].price_usd;
  this.canAmount =  this.getTokenBalanceAtAddress(this.ethCAN.daoAddress, this.ethCAN.canAddress, 6);
  this.daoFund = this.canPrice * this.canAmount;
  console.log(this.daoFund);
}

getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
  const etherscanApiToken = this.ethCAN.etherscanApi + tokenAddress; // change this value if you want to use other token.
  const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
  const tokensAPIKey = tokensAtAddress + '&apikey=' + this.ethCAN.ApiKey;
  const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
  console.log(result);
  return result;
}

convertToLocaleString(variable) {
  const withCommas = parseFloat(variable).toFixed(2);
  return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
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


}
