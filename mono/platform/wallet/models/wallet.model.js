import Web3 from 'web3';
import mongoose  from '../../common/services/mongoose.service.js';
import { emitter } from '../../common/services/event.service.js';
import DotEnv from 'dotenv';
DotEnv.config();
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const WalletSchema = new Schema({
    _id: { type: String, default: v4 },
    created_by: {type: String, 'required': true, unique: true },
    balance: {type: Number,'required': true, default: 0 },
    updated_date: {type: Date, default: Date.now},
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false },
    is_active: {type: Boolean, default: true }
});

const Wallet = mongoose.model('wallet',WalletSchema,'wallet');

export const web3SendTransaction = async (data) => { 

    /*
    return {
        receipt: {
            transfer_hash: '0x9288324234234242sfsdfweww2f43',
            ...{}
        }
    }
    */
   
const addressFrom = data.from_web3_wallet;
const addressTo = data.to_web3_wallet;;
const privateKey = data.wallet_key;
const object = new Web3(process.env.cryptoNetwork);
console.log(
    `Attempting to make transaction from ${addressFrom} to ${addressTo} ${data}`
);

  const val = object.utils.toNumber(object.utils.toWei("0.00001", "ether"));
  const createTransaction =  await object.eth.accounts.signTransaction(
     {
        from: addressFrom,
        to: addressTo,
        value: object.utils.toHex(val),
        gasPrice: await object.eth.getGasPrice()
     },
     privateKey
  );

  // Deploy transaction
  const createReceipt = await object.eth.sendSignedTransaction(
     createTransaction.rawTransaction
  );
  
  console.log(
     `Transaction successful with hash: ${createReceipt.transactionHash}`
  );

  return {
    transfer_hash: createReceipt.transactionHash,
    ...createReceipt
  }
}

export async function createWallet(data) {
    const wallet = new Wallet(data);
    const result = await wallet.save();
    return result;
}

export async function getWalletByCreated(created_by, web3_wallet) {
    const object = new Web3(process.env.cryptoNetwork);
    const n = await object.eth.getBalance(web3_wallet); 
    const balance = object.utils.fromWei(n, "ether");
    return { balance: Number(balance) }
}

/*
export async function getWalletById(id) {
    return await Wallet.findById(id);
}
*/

export async function updateWallet(data) {
    const updatedWallet = await Wallet.findById(data.wallet_id);
    await updatedWallet.updateOne({...data});
    return await Wallet.findById(data.wallet_id);
}

// Ensure virtual fields are serialised.
WalletSchema.set('toJSON', {
    virtuals: true
});

WalletSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.wallet_id = ret._id;
    delete ret._id;
    delete ret.__v;
}