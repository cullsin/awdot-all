import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { 
    hasValidInsertFields,
    hasValidGetFields,
    hasValidCompaniesFields,
    hasValidInvestmentFields,
    hasValidUserFields,
    hasValidUpdateFields,
    hasValidBoughtFields,
    hasValidUpdateCountFields
} from './middlewares/verify.shares.middleware.js';
import {
    doGet,
    doInsert,
    doCompany,
    doInvestment,
    doUpdate,
    doUpdateCount,
    doUser,
    doBought
 } from './controllers/shares.controller.js';

export default function sharesRoutesConfig (app) {
    app.post('/shares/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    
    app.post('/shares/get', [
        validJWTNeeded,
        hasValidGetFields,
        doGet
    ]);

    app.post('/shares/company', [
        validJWTNeeded,
        hasValidCompaniesFields,
        doCompany
    ]);

    app.post('/shares/investment', [
        validJWTNeeded,
        hasValidInvestmentFields,
        doInvestment
    ]);

    app.post('/shares/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser
    ]);

    app.post('/shares/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);

    /* Update to Investment Portfolio is disconnected. Will do if required */
    app.post('/shares/bought', [
        validJWTNeeded,
        hasValidUpdateCountFields,
        doUpdateCount
    ]);
    
}