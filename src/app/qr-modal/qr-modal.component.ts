import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import QRCode from "qrcode";

@Component({
  selector: "app-qr-modal",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">WalletConnect QR code</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p align="center"><img [src]="qrCode" /></p>
      <p>Please use a WalletConnect to scan the QR code above</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-primary btn-w-xl"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `
  // templateUrl: "./qr-modal.component.html",
  // styleUrls: ["./qr-modal.component.css"]
})
export class QrModalComponent implements OnInit {
  public qrCode: string;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
  async generateQRCode(data: string) {
    this.qrCode = await QRCode.toDataURL(data);
    // console.log(this.qrCode);
  }
}
