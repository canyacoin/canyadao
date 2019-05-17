import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  closeResult: string;
  id = 2;

  constructor(private modalService: NgbModal, private walletService: WalletService) { }

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
