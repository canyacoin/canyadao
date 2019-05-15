import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  id = 4;

  constructor() { }

  ngOnInit() {
  }

  setID(id): void {
    this.id = id;
  }

}
