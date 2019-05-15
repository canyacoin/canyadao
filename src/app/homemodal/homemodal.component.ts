import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { WalletService } from '../wallet.service';
import { HomeComponent } from '../home/home.component';
import { DATADAO } from '../dataDAO';


@Component({
  selector: 'app-homemodal',
  templateUrl: './homemodal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./homemodal.component.css']
})
export class HomemodalComponent implements OnInit {
  @Input() id: number;
  dataDAO = DATADAO;

  closeResult: string;

  constructor(private modalService: NgbModal, private homeComponent: HomeComponent, private walletService: WalletService) {}

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'content-center'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  checkWallet(){
    this.homeComponent.checkWallet();
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

  public navigateWallet(){
    this.homeComponent.navigateWallet();
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



}
