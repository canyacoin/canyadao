import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wlt-connect',
  styleUrls: ['../wallet/wallet.component.css'],
  template: `<p class="fw-300" style="font-size:1.5rem">Wallet Connect (Recommended)</p>
              <p>Scan a QR code from your mobile wallet using WalletConnect.</p>
              <p>Recommended Wallets: <strong>Trust Wallet</strong><span>, </span><strong>CoolWallet S</strong></p>
              <hr>
              <div class="px-30">
                <div>
                  <a class="hvr-grow">
                    <strong class="fw-300">Show QR Code</strong>
                  </a>
                </div>
              </div>
              <hr>
              <div style="padding-top:10px"></div>
              `
})
export class ConnectWLTComponent {
  @Input() id;
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
    <div class="col-sm-1 bg-white"></div>
    <div class="col-sm-2 bg-lgrey py-30">
      <button class="btn btn-round fw-400" style="width:35px; height: 35px; padding:0;letter-spacing: 0px;text-transform:none; color:#33ccff; border-color:#33ccff;font-size:18px;background-color: transparent">1</button>
    </div>
    <div class="col-sm-8 bg-lgrey  py-30">
      <strong class="fw-300">Connect Ledger and insert PIN</strong>
    </div>
    <div class="col-sm-1 bg-white"></div>
  </div>
  <div style="padding-top:10px"></div>
  <div class="row bg-white">
    <div class="col-sm-1 bg-white"></div>
    <div class="col-sm-2 bg-lgrey py-30">
      <p class="btn btn-round fw-400" style="width:35px; height: 35px; padding:0;letter-spacing: 0px;text-transform:none; color:#33ccff; border-color:#33ccff;font-size:18px;background-color: transparent">2</p>
    </div>
    <div class="col-sm-8 bg-lgrey  py-30">
      <strong class="fw-300">Open BinanceChain App</strong>
    </div>
    <div class="col-sm-1 bg-white"></div>
  </div>
  <hr>

  <div class="row">
    <div class="col-sm-8">
      <div class="row">
        <a href="https://www.binance.org/static/guides/DEX-Ledger-Documentation.html" target="_blank">App Installation Instructions</a>
      </div>
      <div class="row">
        <a href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux" target="_blank">Connection issues</a>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="row text-right">
        <div class="col">
          <a class="btn btn-primary btn-w-xl" style="margin-right:40px" href="/">UNLOCK LEDGER</a>
        </div>
      </div>
    </div>
  </div>`
})
export class LedgerWLTComponent {
  @Input() id;
}

@Component({
  selector: 'app-wlt-keystore',
  template: `<p class="fw-300" style="font-size:1.5rem">Select Keystore File</p>
  <hr>
<div class="row justify-content-center">
    <a class="btn btn-primary btn-outline btn-w-md" style="width:200px" href="/">UPLOAD FILE</a>
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
      <a class="btn btn-primary btn-w-md" style="margin-right:40px" href="/">UNLOCK</a>
    </div>
  </div>`
})
export class KeystoreWLTComponent {
  @Input() id;
}

@Component({
  selector: 'app-wlt-phrase',
  template: `              <p class="fw-300" style="font-size:1.5rem">Enter 24-word Phrase</p>
                <hr>
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
                    <a class="btn btn-primary btn-w-md" style="margin-right:40px" href="/">UNLOCK</a>
                  </div>
                </div>`
})
export class PhraseWLTComponent {
  @Input() id;
}

export const WalletSwitchComponent =
  [ ConnectWLTComponent, LedgerWLTComponent, KeystoreWLTComponent, PhraseWLTComponent ];
