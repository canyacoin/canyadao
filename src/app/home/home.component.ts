import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tier } from '../dataTier';
import { DATADAO } from '../dataDAO';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  dataDAO = DATADAO;
  perks0 = []; perks1 = []; perks2 = [];  perks3 = [];

  canAmount = 20000000;
  canPrice = 0.02;
  canAddress = '0x1d462414fe14cf489c7A21CaC78509f4bF8CD7c0';
  daoAddress = '0x685678927216DF235A4A5A952EfE88ed55e62Ff2';
  apiKey = 'J5NSX2YJY1U6U5T8WBFDKKQWWYEPI2P735';

  // Flags
  loading = true;

  closeResult: string;

  constructor(private router: Router,
    private activatedRoute:  ActivatedRoute,
  private modalService: NgbModal) {}


  ngOnInit() {
        setTimeout( () => {
            this.loading = false;
            }, 2000
        );
        $('#top-nav .nav-item a').css('color','#919d9d');

        this.canPrice = this.getCANPrice();
        this.canAmount = this.getCANAmountLive();
        this.perks0 = this.getPerks(0);
        this.perks1 = this.getPerks(1);
        this.perks2 = this.getPerks(2);
        this.perks3 = this.getPerks(3);

  }
  ngAfterViewInit(){

  }

  getStake(id): number {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.stake;
  }

  getName(id): string {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.name;
  }

  getPeriod(id): number {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.period;
  }

  getPerks(id): string[] {
    const tier = this.dataDAO.find(tier => tier.id === id);
    return tier.perks;
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
    return this.canPrice * this.canAmount;
  }

  convertToLocaleString(variable) {
    const withCommas = parseFloat(variable).toFixed(2);
    return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
   }

  getCANPrice() {
    const cmcApi = 'https://api.coinmarketcap.com/v1/ticker/canyacoin/';
    const result = (this.getJSON(cmcApi));
    const result2 = result[0].price_usd;
    return result2;
  }

  getCANAmountLive() {
    const result =  this.getTokenBalanceAtAddress(this.daoAddress, this.canAddress, 6);
    return result;
  }

  getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
    const etherscanApi = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='; // the API link.
    const etherscanApiToken = etherscanApi + tokenAddress; // change this value if you want to use other token.
    const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
    const tokensAPIKey = tokensAtAddress + '&apikey=' + this.apiKey;
    const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
    return result;
  }

  // https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken

}
