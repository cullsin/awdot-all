const { Web3 } = require('web3');

async function transact() {
let object = new Web3('https://endpoints.omniatech.io/v1/bsc/testnet/public');

const gaspriceVal = await object.eth.getGasPrice();
const val = object.utils.toNumber(object.utils.toWei("0.00001", "ether"));
const privKey =
'eb5439a01084835c8984f2ed4df7dc3d7b8b98782af3086615d4a96daabf7500';
const createTransaction = await object.eth.accounts.signTransaction(
    {
        from: '0x15878f0A35F006864f8d480537C07630db6f48c8',
        to: '0x33De79D574B096397492c163Df18CCE737b49990',
        value: object.utils.toHex(val),
        gasPrice: gaspriceVal
    },
    privKey
);

// Deploy transaction
 const createReceipt = await object.eth.sendSignedTransaction(
    createTransaction.rawTransaction
 );

 console.log(createReceipt)
}

transact();