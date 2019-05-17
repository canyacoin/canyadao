import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import { WalletService } from '../wallet.service';
import { HomeComponent } from '../home/home.component';
import { DaoService } from '../dao.service';



@Component({
  selector: 'app-homemodal',
  templateUrl: './homemodal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./homemodal.component.css']
})
export class HomemodalComponent implements OnInit {
  @Input() id: number;
  @Input() view: number;

  closeResult: string;

  constructor(private modalService: NgbModal,
    private homeComponent: HomeComponent,
    private walletService: WalletService,
   private daoService: DaoService,
  private router: Router
) {}

  ngOnInit() {
    this.view=0;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'content-center'}).result.then((result)=>
    {this.closeResult = `Closed with: ${result}`, this.view=0;}, (reason) => {
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


    public navigateProfile(){
      this.homeComponent.navigate('/profile');
    }

  getWallet(): string{
    return this.walletService.getWallet();
  }

  getWalletBal(): number{
    return this.walletService.getBalance();
  }

  getWalletBool(): boolean{
    return this.walletService.walletBool;
    // return true;
  }

  getWalletNone(): boolean{
    return this.walletService.walletNone;
    // return false;
  }

  getStaked(): number {
    return this.walletService.getStaked();
  }

  checkWallet(){
    this.homeComponent.checkWallet();
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

  stake(id){
    const current = this.getStaked();
    const toStake = this.getStake(id)-current;
    this.walletService.stake(toStake);
    this.daoService.stake(id);
    }

  enterSign(){
    this.view=1;
  }


}
