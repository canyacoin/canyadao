import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import { WalletService } from '../wallet.service';
import { Tier } from '../dataTier';
import { Member } from '../dataMember';
import { DaoService } from '../dao.service';


declare const require: any;
const BnbApiClient = require('@binance-chain/javascript-sdk');
const axios = require('axios');

import { BNBCHAIN } from '../dataChain';
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


  dataChain = BNBCHAIN;
  ethCAN = ETHCAN;
  public canPrice: number = 0.02;
  public canAmount: number = 2000000;

  constructor(private router: Router,
    private activatedRoute:  ActivatedRoute,
    private modalService: NgbModal,
    private walletService: WalletService,
    private daoService: DaoService) {}


    ngOnInit() {

      console.log(this.dataChain);
      console.log(this.dataChain.name);
      console.log(this.dataChain.api);
      console.log(this.dataChain.symB);
      console.log(this.dataChain.symC);


      this.testBal();

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

  this.canPrice = this.getCANPrice();
  this.canAmount = this.getCANAmountLive();
  this.perks0 = this.getPerks(0);
  this.perks1 = this.getPerks(1);
  this.perks2 = this.getPerks(2);
  this.perks3 = this.getPerks(3);

  // this.dataDAO = this.daoService.getDataDAO();
  // this.memberDAO = this.daoService.getMemberDAO();

  // Alert Timer
  setTimeout(() => this.staticAlertClosed = true, 10000);
  this._success.subscribe((message) => this.successMessage = message);
  this._success.pipe(
    debounceTime(5000)
  ).subscribe(() => this.successMessage = null);

}


async testBal(){

  console.log(this.mnemonic);
  this.mnemonic = 'chase behind alley identify weasel edge party husband force field riot wagon exit leopard three business laundry warrior knife update woman sting such angry';

  console.log('valid mnemonic?', BnbApiClient.crypto.validateMnemonic(this.mnemonic));

  const privateKey = BnbApiClient.crypto.getPrivateKeyFromMnemonic(this.mnemonic);
  const address = BnbApiClient.crypto.getAddressFromPrivateKey(privateKey);
  console.log(privateKey);
  console.log(address);

  // const addressm = 'bnb16w59lfh4y2cqvu8f7yr000ll37ldh4w6hnz7l0';
  // const addresst = 'tbnb1vh0ka0na9ded8h34vd55e9qpa4qhe5cvql9nu3';

  const bnbClient = new BnbApiClient('https://testnet-dex.binance.org/');
  bnbClient.initChain();
  const balanceJSON = await bnbClient.getBalance(address)
  .then(result => {
    console.log(result);
    const bnbArray = result.find(bnbArray => bnbArray.symbol === this.dataChain.symB);
    const bnbBal = bnbArray.free;
    console.log('BNBbal:', bnbBal);

    const canArray = result.find(canArray => canArray.symbol === this.dataChain.symC);
    const canBal = canArray.free;
    console.log('CANbal:', canBal);


    if (result.status === 200) {
      console.log('success', result.result[0].hash);
    } else {
      console.log('result', result);
    }
    // return bal;
  })
    .catch((error) => {
      console.error('error', error);
    });

}


ngAfterViewInit(){

}

getAddress(): string{
  return this.walletService.getAddress();
}

getWalletBool(): boolean{
  return this.walletService.walletBool;
}

getWalletNone(): boolean{
  return this.walletService.walletNone;
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

getMemberWallet(): string {
  return this.daoService.getMemberWallet();
}
getMemberName(): string {
  return this.daoService.getMemberName();
}

getMemberTier(): number {
  return this.daoService.getMemberTier();
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

getCANUSD(){
  return this.ethCAN.canPrice * this.ethCAN.canAmount;
}

convertToLocaleString(variable) {
  const withCommas = parseFloat(variable).toFixed(2);
  return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

getCANPrice() {
  const result = (this.getJSON(this.ethCAN.cmcApi));
  const result2 = result[0].price_usd;
  return result2;
}

getCANAmountLive() {
  const result =  this.getTokenBalanceAtAddress(this.ethCAN.daoAddress, this.ethCAN.canAddress, 6);
  return result;
}

getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
  const etherscanApiToken = this.ethCAN.etherscanApi + tokenAddress; // change this value if you want to use other token.
  const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
  const tokensAPIKey = tokensAtAddress + '&apikey=' + this.ethCAN.cmcApiKey;
  const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
  return result;
}

// https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken

}
