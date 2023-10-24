import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasValidInsertFields,
    hasValidUserFields,
    hasValidUpdateFields,
    hasValidHistoryFields
} from './middlewares/verify.wallet.middleware.js';
import {
    doUser,
    doInsert,
    doUpdate,
} from './controllers/wallet.controller.js';
export default function walletRoutesConfig (app) {

    app.post('/wallet/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser
    ]);
    
    app.post('/wallet/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);

    app.post('/wallet/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);
}