import { 
    doInsert,
    doUpdate,
    doGet,
    doUser,
    doRemove,
    doList,
    doType
} from './controllers/domain.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasValidInsertFields,
    hasValidUpdateFields,
    hasValidGetFields,
    hasValidUserFields,
    hasValidRemoveFields,
    hasValidListFields,
    hasValidTypeFields
} from './middlewares/verify.domain.middleware.js';

export default function domainRoutesConfig (app) {
    app.post('/domain/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);

    app.post('/domain/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);
    
    app.post('/domain/get', [
        validJWTNeeded,
        hasValidGetFields,
        doGet 
    ]);
    app.post('/domain/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser 
    ]);
    app.post('/domain/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
    app.post('/domain/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/domain/type', [
        validJWTNeeded,
        hasValidTypeFields,
        doType 
    ]);
}