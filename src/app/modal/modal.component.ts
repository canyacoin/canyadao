import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  openModal(content) {
    this.modalService.open(content, {
      centered: true });
  }



}
