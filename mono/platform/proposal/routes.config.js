import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasValidInsertFields,
    hasValidUpdateFields,
    hasValidGetFields,
    hasValidUserFields,
    hasValidListFields,
    hasValidRemoveFields
 } from './middlewares/verify.proposal.middleware.js';
import {
    doInsert,
    doUpdate,
    doGet,
    doUser,
    doList,
    doRemove
} from './controllers/proposal.controller.js';
export default function proposalRoutesConfig (app) {
    app.post('/proposal/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    
    app.post('/proposal/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);
    app.post('/proposal/get', [
        validJWTNeeded,
        hasValidGetFields,
        doGet
    ]);

    app.post('/proposal/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser
    ]);

    app.post('/proposal/list', [
        validJWTNeeded,
        hasValidListFields,
        doList
    ]);

    app.post('/proposal/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}