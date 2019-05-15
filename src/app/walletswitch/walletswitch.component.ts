import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service'
import { WalletService } from '../wallet.service'

@Component({
  selector: 'app-wlt-connect',
  styleUrls: ['../wallet/wallet.component.css'],
  template: `<p class="fw-300" style="font-size:1.5rem">Wallet Connect (Recommended)</p>
              <p>Scan a QR code from your mobile wallet using WalletConnect.</p>
              <p>Recommended Browsers:
                <a href="https://trustwallet.com" target="_blank"><strong>Trust Wallet</strong></a>
                <span>, </span>
                <a href="https://coolwallet.io" target="_blank"><strong>CoolWallet S</strong></a>
              </p>

              <hr>
              <div class="px-30 text-center">
                <div>
                  <button class="btn btn-primary btn-w-xl" (click)="setWallet()">Show QR Code</button>
                </div>
              </div>
              <hr>
              <div style="padding-top:10px"></div>
              `
})
export class ConnectWLTComponent {
  @Input() id;

constructor(private walletService: WalletService){
}
setWallet(){
  this.walletService.setWallet('bnbtestwallet');
}
}

@Component({
  selector: 'app-wlt-ledger',
    styleUrls: ['../wallet/wallet.component.css'],
  template: `<p class="fw-300" style="font-size:1.5rem">Ledger Nano (Recommended)</p>
  <p>Recommended Browsers:
    <a href="https://www.google.com/chrome/" target="_blank"><strong>Google Chrome</strong></a>
    <span>, </span>
    <a href="https://brave.com" target="_blank"><strong>Brave Browser</strong></a>
  </p>
  <hr>

  <div class="row bg-white">
  <div class="col mx-30 py-30 bg-lgrey">
  <div class="row">
    <div class="col-2">
      <p class="btn btn-round fw-400" style="width:35px; height: 35px; padding:0;letter-spacing: 0px;text-transform:none; color:#33ccff; border-color:#33ccff;font-size:18px;background-color: transparent">1</p>
    </div>
    <div class="col">
      <strong style="font-size:20 text-align:left">Connect Ledger and insert PIN</strong>
    </div>
  </div>
  </div>
  </div>


  <div style="padding-top:10px"></div>

  <div class="row bg-white">
  <div class="col mx-30 py-30 bg-lgrey">
  <div class="row">
    <div class="col-2">
      <p class="btn btn-round fw-400" style="width:35px; height: 35px; padding:0;letter-spacing: 0px;text-transform:none; color:#33ccff; border-color:#33ccff;font-size:18px;background-color: transparent">2</p>
    </div>
    <div class="col">
      <strong style="font-size:20 text-align:left">Open BinanceChain App</strong>
    </div>
  </div>
  </div>
  </div>
  <hr>

  <div class="row">
    <div class="col">
      <div class="row">
        <a href="https://www.binance.org/static/guides/DEX-Ledger-Documentation.html" target="_blank">App Installation Instructions</a>
      </div>
      <div class="row">
        <a href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux" target="_blank">Connection issues</a>
      </div>
    </div>
    <div class="col mt-10">
      <div class="row text-right">
        <div class="col">
          <button class="btn btn-primary btn-w-xl" style="margin-right:40px" (click)="setWallet()">UNLOCK LEDGER</button>
        </div>
      </div>
    </div>
  </div>`
})
export class LedgerWLTComponent {
  @Input() id;

  constructor(private walletService: WalletService){
  }
  setWallet(){
    this.walletService.setWallet('bnbtestwallet');
  }
}

@Component({
  selector: 'app-wlt-keystore',
  template: `<p class="fw-300" style="font-size:1.5rem">Select Keystore File</p>
  <div class="form-group text-center">
    <label class="" style="width:200px" for="file"></label>
    <input type="file"
           id="file"
           (change)="handleFileInput($event.target.files)">
</div>

  <form class="" action="index.html" method="post">
    <div class="form-group">
      <label for="InputKey1" style="font-size:1rem">Or paste here:</label>
      <textarea class="form-control" rows="3" id="InputKey1" placeholder="24 word phrase"></textarea>
      <small id="keyHelp" class="form-text text-muted">The browser does not store your keys</small>
    </div>
    <div class="form-group">
      <label for="InputPassword" style="font-size:1rem">Encrypt with password:</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="password">
      <small id="pwdHelp" class="form-text text-muted">This will securely encrypt your keys in the browser</small>
    </div>
  </form>
  <hr>
  <div style="padding-top:10px"></div>
  <div class="row text-right">
    <div class="col">
      <button class="btn btn-primary btn-w-md" style="margin-right:40px" (click)="setWallet()">UNLOCK</button>
    </div>
  </div>`
})
export class KeystoreWLTComponent {
  @Input() id;

  constructor(private fileUploadService: FileUploadService, private walletService: WalletService){

  }

  fileToUpload: File = null;

  setWallet(){
    this.walletService.setWallet('bnbtestwallet');
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }
}

@Component({
  selector: 'app-wlt-phrase',
  template: `              <p class="fw-300" style="font-size:1.5rem">Enter 24-word Phrase</p>
                <form class="" action="index.html" method="post">
                  <div class="form-group">
                    <label for="InputKey1" style="font-size:1rem">Enter words here:</label>
                    <textarea class="form-control" rows="3" id="InputKey1" placeholder="24 word phrase"></textarea>
                    <small id="keyHelp" class="form-text text-muted">The browser does not store your keys</small>
                  </div>
                  <div class="form-group">
                    <label for="InputPassword" style="font-size:1rem">Encrypt with password:</label>
                    <input type="password" class="form-control" id="InputPassword" placeholder="password">
                    <small id="pwdHelp" class="form-text text-muted">This will securely encrypt your keys in the browser.</small>
                    <small id="pwdHelp" class="form-text text-muted">Must be at least 8 characters.</small>
                  </div>
                </form>
                <hr>
                <div style="padding-top:10px"></div>
                <div class="row text-right">
                  <div class="col">
                    <button class="btn btn-primary btn-w-md" style="margin-right:40px" (click)="setWallet()">UNLOCK</button>
                  </div>
                </div>`
})
export class PhraseWLTComponent {
  @Input() id;

  constructor(private walletService: WalletService){
  }
  setWallet(){
    this.walletService.setWallet('bnbtestwallet');
  }

}

export const WalletSwitchComponent =
  [ ConnectWLTComponent, LedgerWLTComponent, KeystoreWLTComponent, PhraseWLTComponent ];
