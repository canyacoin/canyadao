import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DATADAO } from '../dataDAO';


@Component({
  selector: 'app-withdrawmodal',
  templateUrl: './withdrawmodal.component.html',
    encapsulation: ViewEncapsulation.None,
  styleUrls: ['./withdrawmodal.component.css']
})
export class WithdrawmodalComponent implements OnInit {

    @Input() id: number;
      dataDAO = DATADAO;
      closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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

}
