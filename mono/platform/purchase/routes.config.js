import {
    doGet,
    doInsert,
    doUpdate,
    doUser,
    doFee
} from './controllers/purchase.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasValidInsertFields,
    hasValidUserFields,
    hasValidUpdateFields,
    hasValidGetFields
 } from './middlewares/verify.purchase.middleware.js';
export default function purchaseRoutesConfig (app) {
    app.post('/purchase/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/purchase/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);    
    app.post('/purchase/user', [
        validJWTNeeded, 
        hasValidUserFields,
        doUser
    ]);
    app.post('/purchase/fee', [
        validJWTNeeded, 
        doFee
    ]);
    app.post('/purchase/get', [
        validJWTNeeded,
        hasValidGetFields,
        doGet 
    ]);
}