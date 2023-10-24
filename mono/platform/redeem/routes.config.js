import { doInsert,doGet,doUser, doUpdate, doFee } from './controllers/redeem.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { 
    hasValidInsertFields,
    hasValidGetFields,
    hasValidUserFields,
    hasValidUpdateFields
} from './middlewares/verify.redeem.middleware.js';

export default function redeemRoutesConfig (app) {
    app.post('/redeem/insert', [
        validJWTNeeded, 
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/redeem/fee', [
        validJWTNeeded, 
        doFee
    ]);
    app.post('/redeem/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate    
    ]);
    app.post('/redeem/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/redeem/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser 
    ]);
}