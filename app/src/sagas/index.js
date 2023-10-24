import { all, fork } from 'redux-saga/effects';
import tokenSaga from '../db/saga/token';
import loginSaga from '../db/saga/login';
import registerUserSaga from '../db/saga/registerUser';
import forgetPasswordSaga from '../db/saga/forgetPassword';
import activateUserSaga from '../db/saga/activateUser';
import generateOtpSaga from '../db/saga/generateOtp';
import { getFileSaga, removeFileSaga, uploadFileSaga, insertFileConnectSaga, 
removeFileConnectSaga, getFileConnectSaga, userFileConnectSaga } from '../db/saga/file'; 
import {emailByUserSaga} from '../db/saga/user';
import { insertBankSaga, removeBankSaga, getBankSaga } from '../db/saga/bank';
import { getProfileSaga, insertProfileSaga, updateProfileSaga } from '../db/saga/profile';
import conversionSaga from '../db/saga/conversion';
import { generateStripeClientKeySaga, stripeReturnResponseSaga, stripeTransferSaga } from '../db/saga/stripe';
import { insertPurchaseSaga, userPurchaseSaga, getPurchaseSaga, feePurchaseSaga, updatePurchaseSaga } from '../db/saga/purchase';
import { interestedCompaniesSaga, removeCompaniesSaga, updateCompaniesSaga,
  listCompaniesSaga, userCompaniesSaga, insertCompaniesSaga, getCompaniesSaga } from '../db/saga/companies';
import { searchGDBCompaniesSaga, listGDBCompaniesSaga, getGDBCompaniesSaga, mailGDBCompaniesSaga } from '../db/saga/gdb';
  
import { interestedPartnersSaga, removePartnersSaga, updatePartnersSaga,
    listPartnersSaga, userPartnersSaga, insertPartnersSaga, getPartnersSaga } from '../db/saga/partners';
  import { removeCategoriesSaga, listCategoriesSaga,
    companiesCategoriesSaga, insertCategoriesSaga, getCategoriesSaga } from '../db/saga/categories';
    import { removeInterestSaga, listInterestSaga,
      partnersInterestSaga, insertInterestSaga, getInterestSaga } from '../db/saga/interest';
    import { removeProductSaga, listProductSaga,
      companiesProductSaga, insertProductSaga, getProductSaga } from '../db/saga/product';
      import {
        removeClientsSaga, listClientsSaga,
        insertClientsSaga, getClientsSaga, partnersClientsSaga 
         } from '../db/saga/clients';
import {  removeProposalSaga,
    listProposalSaga, userProposalSaga, insertProposalSaga, getProposalSaga, updateProposalSaga } from '../db/saga/proposal';  
import { insertInvestmentSaga, interestedInvestmentSaga, 
  getInvestmentSaga, userInvestmentSaga,updateInvestmentSaga,
  removeInvestmentSaga, listInvestmentSaga} from '../db/saga/investment';
  import { insertDomainSaga, TypeDomainSaga, 
    getDomainSaga, userDomainSaga,updateDomainSaga,
    removeDomainSaga, listDomainSaga} from '../db/saga/domain';
import { insertSharesSaga, getSharesSaga, updateSharesSaga, userSharesSaga, boughtSharesSaga, companiesSharesSaga } from '../db/saga/shares';
import { insertWalletHistorySaga, insertWalletSaga, 
  getWalletSaga, userWalletHistorySaga, userWalletSaga,
  updateWalletSaga } from '../db/saga/wallet';
import { insertTransactionSaga, getTransactionSaga, userTransactionSaga } from '../db/saga/transaction';
import { insertRedeemSaga, getRedeemSaga, userRedeemSaga, feeRedeemSaga, updateRedeemSaga } from '../db/saga/redeem';

export default function* rootSaga() {
  yield all([
    fork(searchGDBCompaniesSaga),
    fork(listGDBCompaniesSaga),
    fork(getGDBCompaniesSaga),
    fork(mailGDBCompaniesSaga),
    fork(interestedPartnersSaga), 
    fork(removePartnersSaga), 
    fork(updatePartnersSaga),
    fork(listPartnersSaga), 
    fork(userPartnersSaga), 
    fork(insertPartnersSaga), 
    fork(getPartnersSaga),
    fork(removeInterestSaga),
    fork(removeClientsSaga), 
    fork(listClientsSaga),
    fork(insertClientsSaga), 
    fork(getClientsSaga), 
    fork(partnersClientsSaga),
    fork(listInterestSaga),
    fork(partnersInterestSaga), 
    fork(insertInterestSaga), 
    fork(getInterestSaga),
    fork(insertDomainSaga), 
    fork(TypeDomainSaga), 
    fork(getDomainSaga), 
    fork(userDomainSaga),
    fork(updateDomainSaga),
    fork(removeDomainSaga), 
    fork(listDomainSaga),
    fork(insertInvestmentSaga), 
    fork(interestedInvestmentSaga), 
    fork(getInvestmentSaga), 
    fork(userInvestmentSaga),
    fork(updateInvestmentSaga),
    fork(removeInvestmentSaga), 
    fork(listInvestmentSaga),
    fork(removeProposalSaga),
    fork(listProposalSaga),
    fork(userProposalSaga),
    fork(insertProposalSaga), 
    fork(getProposalSaga), 
    fork(updateProposalSaga),
    fork(interestedCompaniesSaga), 
    fork(removeCompaniesSaga), 
    fork(updateCompaniesSaga),
    fork(listCompaniesSaga), 
    fork(userCompaniesSaga), 
    fork(insertCompaniesSaga), 
    fork(getCompaniesSaga),
    fork(removeCategoriesSaga), 
    fork(listCategoriesSaga),
    fork(companiesCategoriesSaga), 
    fork(insertCategoriesSaga), 
    fork(getCategoriesSaga),
    fork(removeProductSaga), 
    fork(listProductSaga),
    fork(companiesProductSaga), 
    fork(insertProductSaga), 
    fork(getProductSaga),
    fork(insertSharesSaga), 
    fork(getSharesSaga), 
    fork(updateSharesSaga), 
    fork(userSharesSaga), 
    fork(boughtSharesSaga), 
    fork(companiesSharesSaga),
    fork(insertPurchaseSaga), 
    fork(userPurchaseSaga), 
    fork(getPurchaseSaga), 
    fork(feePurchaseSaga), 
    fork(updatePurchaseSaga),
    fork(insertWalletHistorySaga), 
    fork(insertWalletSaga), 
    fork(getWalletSaga), 
    fork(userWalletHistorySaga), 
    fork(userWalletSaga),
    fork(updateWalletSaga),
    fork(insertTransactionSaga), 
    fork(getTransactionSaga), 
    fork(userTransactionSaga),
    fork(insertRedeemSaga), 
    fork(getRedeemSaga), 
    fork(userRedeemSaga),
    fork(feeRedeemSaga),
    fork(updateRedeemSaga),
    fork(generateStripeClientKeySaga),
    fork(stripeReturnResponseSaga),
    fork(tokenSaga),
    fork(loginSaga),
    fork(registerUserSaga),
    fork(forgetPasswordSaga),
    fork(activateUserSaga),
    fork(generateOtpSaga),
    fork(emailByUserSaga),
    fork(removeFileSaga),
    fork(uploadFileSaga),
    fork(getFileSaga),
    fork(insertFileConnectSaga),
    fork(removeFileConnectSaga), 
    fork(getFileConnectSaga), 
    fork(userFileConnectSaga),
    fork(insertBankSaga),
    fork(removeBankSaga),
    fork(getBankSaga),
    fork(conversionSaga),
    fork(getProfileSaga),
    fork(insertProfileSaga),
    fork(updateProfileSaga),
    fork(stripeTransferSaga)
  ]);
}
/*
export default function* rootSaga() {
  const sagas = [
    generateStripeClientKeySaga, 
    stripeReturnResponseSaga, 
    stripeTransferSaga,
    tokenSaga,
    loginSaga,
    registerUserSaga,
    forgetPasswordSaga,
    activateUserSaga,
    generateOtpSaga,
    emailByUserSaga,
    removeFileSaga,
    uploadFileSaga,
    getFileSaga,
    insertFileConnectSaga,
    removeFileConnectSaga, 
    getFileConnectSaga, 
    userFileConnectSaga,
    insertBankSaga,
    removeBankSaga,
    getBankSaga,
    conversionSaga,
    getProfileSaga,
    insertProfileSaga,
    updateProfileSaga,
    stripeTransferSaga,
    interestedCompaniesSaga, removeCompaniesSaga, updateCompaniesSaga,
    listCompaniesSaga, userCompaniesSaga, insertCompaniesSaga, getCompaniesSaga,
    tokenSaga,loginSaga,registerUserSaga, activateUserSaga, forgetPasswordSaga,
    generateOtpSaga,
    emailByUserSaga,insertInvestmentSaga, interestedInvestmentSaga, 
    getInvestmentSaga, userInvestmentSaga,removeInvestmentSaga,updateInvestmentSaga, 
    listInvestmentSaga, insertSharesSaga, getSharesSaga, updateSharesSaga, boughtSharesSaga, 
    companiesSharesSaga, userSharesSaga, insertTransactionSaga, getTransactionSaga, userTransactionSaga,
    insertWalletHistorySaga, insertWalletSaga, getWalletSaga, userWalletHistorySaga, 
    userWalletSaga, updateWalletSaga,
    insertPurchaseSaga, getPurchaseSaga, userPurchaseSaga,
    insertRedeemSaga, getRedeemSaga, userRedeemSaga,
    removeProposalSaga,updateProposalSaga,
    listProposalSaga, userProposalSaga, insertProposalSaga, getProposalSaga,
    insertPurchaseSaga, userPurchaseSaga, getPurchaseSaga, feePurchaseSaga,updatePurchaseSaga
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}
*/