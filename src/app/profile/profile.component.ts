import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
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
  public typeBtn:string;
  public tierDAO:number;


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

    setID(id) {
      this.id = id;
    }

    public updateProfile(dao, id){
      this.daoService.inDAO=dao;
      this.tierDAO = id;
    }

    getWallet(): string{
      return this.walletService.getWallet();
    }

    getWalletBal(): number{
      return this.walletService.getBalance();
    }

    getStaked(): number {
      return this.walletService.getStaked();
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

    getDAOStatus(): boolean {
      return this.daoService.inDAO;
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

    getMemberDate() {
      return this.daoService.getMemberDate();
    }

    dateDiff(): number {
        let today = new Date();
        var dateDAO = this.getMemberDate();
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var diffDays = Math.round(Math.abs((today.getTime() - dateDAO.getTime())/(oneDay)));
        return diffDays;
      }

    onButtonGroupClick($event){
      let clickedElement = $event.target || $event.srcElement;
      if( clickedElement.nodeName === "BUTTON" ) {

        let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".clicked");
        // if a Button already has Class: .active
        if( isCertainButtonAlreadyActive ) {
          isCertainButtonAlreadyActive.classList.remove("clicked");
        }

        clickedElement.className += " clicked";
      }

    }

    convertToLocaleString(variable) {
      const withCommas = parseFloat(variable).toFixed(2);
      return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

  }
