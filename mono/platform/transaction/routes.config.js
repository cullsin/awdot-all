import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasValidInsertFields,
    hasValidGetFields,
    hasValidUserFields
 } from './middlewares/verify.transaction.middleware.js';
import {
    doInsert,
    doGet,
    doUser
 } from './controllers/transaction.controller.js';
export default function transactionRoutesConfig (app) {
    app.post('/transaction/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    
    app.post('/transaction/get', [
        validJWTNeeded,
        hasValidGetFields,
        doGet
    ]);

    app.post('/transaction/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser
    ]);
}