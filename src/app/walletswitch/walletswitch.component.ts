import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FileUploadService } from "../file-upload.service";
import { WalletService } from "../wallet.service";
import WalletConnect from "@walletconnect/browser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { QrModalComponent } from "../qr-modal/qr-modal.component";

@Component({
  selector: "app-wlt-connect",
  styleUrls: ["../profile/profile.component.css"],
  template: `
    <p class="fw-300" style="font-size:1.5rem">Wallet Connect (Recommended)</p>
    <p>Scan a QR code from your mobile wallet using WalletConnect.</p>
    <p>
      Recommended Browsers:
      <a href="https://trustwallet.com" target="_blank"
        ><strong>Trust Wallet</strong></a
      >
      <span>, </span>
      <a href="https://coolwallet.io" target="_blank"
        ><strong>CoolWallet S</strong></a
      >
    </p>

    <hr />
    <div class="row">
      <div class="col text-center mr-30">
        <img
          class="logo-default"
          src="assets/img/qr-code.svg"
          width="auto"
          height="80px"
          alt="logo"
        />
      </div>
      <div class="col text-left align-self-center">
        <div class="px-30">
          <div>
            <button
              class="btn btn-primary btn-w-xl"
              (click)="setWallet(qrModal)"
            >
              Show QR Code
            </button>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div style="padding-top:10px"></div>
  `
})
export class ConnectWLTComponent {
  @Input() id;

  constructor(
    private router: Router,
    private walletService: WalletService,
    private modalService: NgbModal
  ) {}
  setWallet() {
    let modalRef;
    /**
     *  Create a walletConnector
     */
    const walletConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org" // Required
    });

    /**
     *  Check if connection is already established
     */
    if (!walletConnector.connected) {
      // create new session
      walletConnector.createSession().then(() => {
        // get uri for QR Code modal
        // display QR Code modal
        modalRef = this.modalService.open(QrModalComponent);
        modalRef.componentInstance.generateQRCode(walletConnector.uri);
      });
    }

    /**
     *  Subscribe to connection events
     */
    walletConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // close QR Code Modal
      modalRef.close();

      // get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      this.walletService.setWallet("bnbtestwallet");
    });

    walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // delete walletConnector
    });
  }
}

@Component({
  selector: "app-wlt-ledger",
  styleUrls: ["../profile/profile.component.css"],
  template: `
    <p class="fw-300" style="font-size:1.5rem">Ledger Nano (Recommended)</p>
    <p>
      Recommended Browsers:
      <a href="https://www.google.com/chrome/" target="_blank"
        ><strong>Google Chrome</strong></a
      >
      <span>, </span>
      <a href="https://brave.com" target="_blank"
        ><strong>Brave Browser</strong></a
      >
    </p>
    <hr />

    <div class="row bg-white">
      <div class="col mx-30 py-20 bg-lgrey">
        <div class="row">
          <div class="col-2 align-self-center">
            <p
              class="btn btn-round fw-400"
              style="width:35px; height: 35px; padding:0;letter-spacing: 0px;text-transform:none; color:#33ccff; border-color:#33ccff;font-size:18px;background-color: transparent"
            >
              1
            </p>
          </div>
          <div class="col">
            <strong style="font-size:20 text-align:left"
              >Connect Ledger and insert PIN</strong
            >
            <p>Use a recommended browser</p>
          </div>
          <div class="col">
            <img
              class="logo-default"
              src="assets/img/ledger-pin.svg"
              width="auto"
              height="80px"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>

    <div style="padding-top:10px"></div>

    <div class="row bg-white">
      <div class="col mx-30 py-20 bg-lgrey">
        <div class="row">
          <div class="col-2 align-self-center">
            <p
              class="btn btn-round fw-400"
              style="width:35px; height: 35px; padding:0;letter-spacing: 0px;text-transform:none; color:#33ccff; border-color:#33ccff;font-size:18px;background-color: transparent"
            >
              2
            </p>
          </div>
          <div class="col">
            <strong style="font-size:20 text-align:left"
              >Open BinanceChain App</strong
            >
            <p>"BinanceChain Ready" must be on screen</p>
          </div>
          <div class="col">
            <img
              class="logo-default"
              src="assets/img/ledger-app.svg"
              width="auto"
              height="80px"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>
    <hr />

    <div class="row">
      <div class="col">
        <div class="row">
          <a
            href="https://www.binance.org/static/guides/DEX-Ledger-Documentation.html"
            target="_blank"
            >App Installation Instructions</a
          >
        </div>
        <div class="row">
          <a
            href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux"
            target="_blank"
            >Connection issues</a
          >
        </div>
      </div>
      <div class="col mt-10">
        <div class="row text-right">
          <div class="col">
            <button
              class="btn btn-primary btn-w-xl"
              style="margin-right:40px"
              (click)="setWallet()"
            >
              UNLOCK LEDGER
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LedgerWLTComponent {
  @Input() id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private walletService: WalletService
  ) {}
  setWallet() {
    this.walletService.setWallet("bnbtestwallet");
  }
}

@Component({
  selector: "app-wlt-keystore",
  template: `
    <p class="fw-300" style="font-size:1.5rem">Select Keystore File</p>
    <div class="form-group text-center">
      <label class="" style="width:200px" for="file"></label>
      <input
        type="file"
        id="file"
        (change)="handleFileInput($event.target.files)"
      />
    </div>

    <form class="" action="index.html" method="post">
      <div class="form-group">
        <label for="InputKey1" style="font-size:1rem">Or paste here:</label>
        <textarea
          class="form-control"
          rows="3"
          id="InputKey1"
          placeholder="24 word phrase"
        ></textarea>
        <small id="keyHelp" class="form-text text-muted"
          >The browser does not store your keys</small
        >
      </div>
      <div class="form-group">
        <label for="InputPassword" style="font-size:1rem"
          >Encrypt with password:</label
        >
        <input
          type="password"
          class="form-control"
          id="InputPassword"
          placeholder="password"
        />
        <small id="pwdHelp" class="form-text text-muted"
          >This will securely encrypt your keys in the browser</small
        >
      </div>
    </form>
    <hr />
    <div style="padding-top:10px"></div>
    <div class="row text-right">
      <div class="col">
        <button
          class="btn btn-primary btn-w-md"
          style="margin-right:40px"
          (click)="setWallet()"
        >
          UNLOCK
        </button>
      </div>
    </div>
  `
})
export class KeystoreWLTComponent {
  @Input() id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private walletService: WalletService
  ) {}

  fileToUpload: File = null;

  setWallet() {
    this.walletService.setWallet("bnbtestwallet");
    this.router.navigate(["../home"], { relativeTo: this.route });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
      },
      error => {
        console.log(error);
      }
    );
  }
}

@Component({
  selector: 'app-wlt-phrase',
  template: `      <p class="fw-300" style="font-size:1.5rem">Enter 24-word Phrase</p>
      <form (ngSubmit)="setWalletPhrase()" #walletForm="ngForm">
        <div class="form-group">
          <label style="font-size:1rem" >Enter words here:</label>
          <textarea class="form-control" id="phrase" rows="8" cols="80"
          required
          [(ngModel)]="mnemonic" name="phrase"
          #phrase="ngModel" placeholder="24 word phrase"></textarea>
          <div [hidden]="phrase.valid || phrase.pristine"
          class="alert alert-danger">
          Phrase is required
        </div>
        <small id="keyHelp" class="form-text text-muted">The browser does not store your keys.</small>
      </div>
    <hr>
    <div style="padding-top:10px"></div>
    <div class="row text-right">
      <div class="col">
        <button type="submit" class="btn btn-primary btn-w-md" style="margin-right:40px" [disabled]="!walletForm.form.valid">UNLOCK</button>
      </div>
    </div>
  </form>`
})
export class PhraseWLTComponent {
  @Input() id;

  public mnemonic: string;

  constructor(private walletService: WalletService){
  }

  setWalletPhrase(){
    this.walletService.setPrivateKey(this.mnemonic);
  }
}

export const WalletSwitchComponent = [
  ConnectWLTComponent,
  LedgerWLTComponent,
  KeystoreWLTComponent,
  PhraseWLTComponent
];
