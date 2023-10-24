import { combineReducers } from 'redux';
import token from '../db/reducer/token';
import login from '../db/reducer/login';
import logout from '../db/reducer/logout';
import registerUser from '../db/reducer/registerUser';
import user from '../db/reducer/user';
import stripe from '../db/reducer/stripe';
import message from '../db/reducer/message';
import bank from '../db/reducer/bank';
import profile from '../db/reducer/profile';
import conversion from '../db/reducer/conversion';
import file from '../db/reducer/file';
import shares from '../db/reducer/shares';
import transaction from '../db/reducer/transaction';
import investment from '../db/reducer/investment';
import domain from '../db/reducer/domain';
import companies from '../db/reducer/companies';
import gdb from '../db/reducer/gdb';
import partners from '../db/reducer/partners';
import product from '../db/reducer/product';
import clients from '../db/reducer/clients';
import categories from '../db/reducer/categories';
import interest from '../db/reducer/interest';
import proposal from '../db/reducer/proposal';
import wallet from '../db/reducer/wallet';
import purchase from '../db/reducer/purchase';
import redeem from '../db/reducer/redeem';

const appReducer = combineReducers({
  gdb,
  shares,
  transaction,
  companies,
  categories,
  product,
  clients,
  investment,
  domain,
  proposal,
  wallet,
  purchase,
  redeem,
  file,
  token,
  login,
  registerUser,
  user,
  stripe,
  message,
  bank,
  profile,
  conversion,
  interest,
  partners,
  logout
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

