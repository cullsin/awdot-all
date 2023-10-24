import { 
    doGet,
    doInsert,
    doUpdate,
    doList,
    doMail,
    doRemove,
    doUser,
    doInterested    
 } from './controllers/companies.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidGetFields, 
    hasValidListFields,
    hasValidUserFields,
    hasValidRemoveFields,
    hasValidInterestedFields,
    hasValidUpdateFields
} from './middlewares/verify.companies.middleware.js';

export default function companiesRoutesConfig (app) {
    app.post('/companies/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/companies/mail', [
        doMail
    ]);
    app.post('/companies/update', [
        validJWTNeeded,
        hasValidUpdateFields,
        doUpdate
    ]);
    app.post('/companies/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/companies/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/companies/user', [
        validJWTNeeded,
        hasValidUserFields,
        doUser 
    ]);
    app.post('/companies/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
    app.post('/companies/interested', [
        validJWTNeeded,
        hasValidInterestedFields,
        doInterested 
    ]);
}