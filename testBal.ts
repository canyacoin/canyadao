async function testBal(): number {
  const api = 'https://dex.binance.org/'; /// api string
  const bnbClient = new BnbApiClient(api);
  bnbClient.initChain('Binance-Chain-Tigris');

  this.privatekey = 'testestestsstst';
  // this.privatekey = bnbClient.crypto.generatePrivateKey();

  bnbClient.setPrivateKey(this.privatekey);
  // const address = crypto.getAddressFromPrivateKey(privateKey);
  const address = 'bnb16w59lfh4y2cqvu8f7yr000ll37ldh4w6hnz7l0';

  // const balObj = await bnbClient.getBalance(address).first().toPromise();
  // console.log(balObj);

  const balanceJSON = await bnbClient.getBalance(address).then(success => {
    const bnbArray = success[0];
    const bal = bnbArray.free;
    console.log('bal:', bal);
    return bal;
  });

  return balanceJSON;

}


  // const bal = this.testBal();

  // const balance = balanceJSON[0].free;
  // console.log('balance:', balance);



  // console.log('balance:');



  // httpClient.get(bnbClient.getBalance(address), {observe:'response'}).subscribe( async res => {
  //       console.log(res) ;
  //       let response = res.body;
  //       console.log(response);
  //     });
  //
  //
  //
  //
  //     const httpClient = axios.create({ baseURL: api });
  //     const transactionURL  = `${api}api/v1/transactions`;
  //     // const sequenceURL = `${api}api/v1/account/${address}/sequence`;
  //
  //
  // httpClient
  //   .get(transactionURL)
  //   .then((res) => {
  //       const sequence = res.data.sequence || 0
  //       const balance = bnbClient.getBalance(address);
  //       console.log('address:', address);
  //       console.log('balance:', balance);
  //       return balance;
  //       // return bnbClient.transfer(addressFrom, addressTo, amount, asset, message, sequence)
  //   })
  //   .then((result) => {
  //       console.log(result);
  //       if (result.status === 200) {
  //         console.log('success', result.result[0].hash);
  //       } else {
  //         console.error('error', result);
  //       }
  //   })
  //   .catch((error) => {
  //     console.error('error', error);
  //   });



  // this.mnemonic = BnbApiClient.crypto.generateMnemonic();
  // this.address = BnbApiClient.crypto.getAddressFromPrivateKey(this.privatekey);

  // console.log(this.privatekey);
