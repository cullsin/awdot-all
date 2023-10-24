import { 
    doInsert,
    doUpdate,
    doGet,
    doUser,
    doRemove,
    doList,
    doInterested
} from './controllers/investment.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasValidInsertFields,
    hasValidUpdateFields,
    hasValidGetFields,
    hasValidUserFields,
    hasValidRemoveFields,
    hasValidListFields,
    hasValidInterestedFields
} from './middlewares/verify.investment.middleware.js';

export default function investmentRoutesConfig (app) {
    app.post('/investment/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);

    app.post('/investment/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);
    
    app.post('/investment/get', [
        validJWTNeeded,
        hasValidGetFields,
        doGet 
    ]);
    app.post('/investment/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser 
    ]);
    app.post('/investment/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
    app.post('/investment/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/investment/interested', [
        validJWTNeeded,
        hasValidInterestedFields,
        doInterested 
    ]);
}