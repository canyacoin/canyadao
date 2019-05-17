import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from '../wallet.service';
import { Tier } from '../dataTier';
import { Member } from '../dataMember';
import { DaoService } from '../dao.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  closeResult: string;
  id = 2;
  typeBtn:string;
  tierDAO:string;

  constructor(private modalService: NgbModal,
    private walletService: WalletService,
    private daoService: DaoService) { }

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

  ngOnInit() {
    this.tierDAO = this.daoService.getMemberTier();
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
  getMemberStake(): number {
    return this.daoService.getMemberStake();
  }

  getMemberTier(): string {
    return this.daoService.getMemberTier();
  }

  onButtonGroupClick($event){
  let clickedElement = $event.target || $event.srcElement;
  debugger;
  if( clickedElement.nodeName === "BUTTON" ) {

    let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".clicked");
    // if a Button already has Class: .active
    if( isCertainButtonAlreadyActive ) {
      isCertainButtonAlreadyActive.classList.remove("clicked");
    }

    clickedElement.className += " clicked";
  }

}

}
