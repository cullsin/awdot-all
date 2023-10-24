import { 
    doGet,
    doInsert,
    doUpdate,
    doList,
    doMail,
    doRemove,
    doUser,
    doInterested    
 } from './controllers/partners.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidGetFields, 
    hasValidListFields,
    hasValidUserFields,
    hasValidRemoveFields,
    hasValidInterestedFields,
    hasValidUpdateFields
} from './middlewares/verify.partners.middleware.js';

export default function partnersRoutesConfig (app) {
    app.post('/partners/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/partners/mail', [
        doMail
    ]);
    app.post('/partners/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);
    app.post('/partners/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/partners/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/partners/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser 
    ]);
    app.post('/partners/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
    app.post('/partners/interested', [
        validJWTNeeded,
        hasValidInterestedFields,
        doInterested 
    ]);
}