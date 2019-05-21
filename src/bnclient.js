const BnbApiClient = require('@binance-chain/javascript-sdk');
const axios = require('axios');
var fs = require('fs');

const api = 'https://testnet-dex.binance.org/'; /// api string



function doKey(){
const privateKey = BnbApiClient.crypto.generatePrivateKey();
console.log('dokey', privateKey);
}

function doKeystore(){
  let filename = './keystore';
  let password = 'Password123!';
  console.log('filename', filename)

  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    // recover from keystore
    const privateKey = BnbApiClient.crypto.getPrivateKeyFromKeyStore(data, password);
    console.log(privateKey);
    const addressFrom = BnbApiClient.crypto.getAddressFromPrivateKey(privateKey);
    console.log(addressFrom);
  });
}


function doMnemonic(){
  // mnemonic
  const mnemonic = BnbApiClient.crypto.generateMnemonic() // => 24 words
  console.log('valid mnemonic?', BnbApiClient.crypto.validateMnemonic(mnemonic))
  console.log('Mnemonic:', mnemonic)
}


function sendTX(){
  let privKey = 'e3aa5efecca509a8cab54843a101d8f73458e8666f77096a0462109150c8a003'; // privkey hexstring (keep this safe)

  const asset = 'BNB'; // asset string
  const amount = 1.123; // amount float
  const addressTo = 'tbnb1xf77kcq4aal2d8qusrcda0g4fd2szscpy7rqfd'; // addressTo string
  const addressFrom = BnbApiClient.crypto.getAddressFromPrivateKey(privKey); // addressFrom string
  const message = 'A note to you'; // memo string

  const bnbClient = new BnbApiClient(api);
  const httpClient = axios.create({ baseURL: api });
  const sequenceURL = `${api}api/v1/account/${addressFrom}/sequence`;

  bnbClient.setPrivateKey(privKey);
  bnbClient.initChain();

  httpClient
  .get(sequenceURL)
  .then((res) => {
    const sequence = res.data.sequence || 0
    return bnbClient.transfer(addressFrom, addressTo, amount, asset, message, sequence)
  })
  .then((result) => {
    console.log(result);
    if (result.status === 200) {
      console.log('success', result.result[0].hash);
    } else {
      console.error('error', result);
    }
  })
  .catch((error) => {
    console.error('error', error);
  });
}

function freezeBNB(){
  let privKey = 'e3aa5efecca509a8cab54843a101d8f73458e8666f77096a0462109150c8a003'; // privkey hexstring (keep this safe)

  const asset = 'BNB'; // asset string
  const amount = 1.123; // amount float
  const addressTo = 'tbnb1xf77kcq4aal2d8qusrcda0g4fd2szscpy7rqfd'; // addressTo string
  const addressFrom = BnbApiClient.crypto.getAddressFromPrivateKey(privKey); // addressFrom string
  const message = 'A note to you'; // memo string

  const bnbClient = new BnbApiClient(api);
  const httpClient = axios.create({ baseURL: api });
  const sequenceURL = `${api}api/v1/account/${addressFrom}/sequence`;

  bnbClient.setPrivateKey(privKey);
  bnbClient.initChain();

  httpClient
  .get(sequenceURL)
  .then((res) => {
    const sequence = res.data.sequence || 0
    return bnbClient.transfer(addressFrom, addressTo, amount, asset, message, sequence)
  })
  .then((result) => {
    console.log(result);
    if (result.status === 200) {
      console.log('success', result.result[0].hash);
    } else {
      console.error('error', result);
    }
  })
  .catch((error) => {
    console.error('error', error);
  });
}
