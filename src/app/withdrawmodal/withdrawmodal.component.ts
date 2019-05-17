import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Tier } from '../dataTier';
import { Member } from '../dataMember';
import { DaoService } from '../dao.service';


@Component({
  selector: 'app-withdrawmodal',
  templateUrl: './withdrawmodal.component.html',
    encapsulation: ViewEncapsulation.None,
  styleUrls: ['./withdrawmodal.component.css']
})
export class WithdrawmodalComponent implements OnInit {

    @Input() typeBtn: string;
    @Input() tierDAO: string;
      closeResult: string;

  constructor(private modalService: NgbModal,
  private daoService: DaoService) { }

  ngOnInit() {
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'content-center'}).result.then((result) => {
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

  convertToLocaleString(variable) {
    const withCommas = parseFloat(variable).toFixed(2);
    return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

}
