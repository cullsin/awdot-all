import { 
    doGet,
    doInsert,
    doList,
    doRemove,
    doPartners    
 } from './controllers/interest.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidGetFields, 
    hasValidListFields,
    hasValidPartnersFields,
    hasValidRemoveFields,
} from './middlewares/verify.interest.middleware.js';

export default function interestRoutesConfig (app) {
    app.post('/interest/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/interest/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/interest/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/interest/partners', [
        validJWTNeeded,
        hasValidPartnersFields,
        doPartners 
    ]);
    app.post('/interest/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}