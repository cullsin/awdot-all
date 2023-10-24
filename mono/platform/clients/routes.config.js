import { 
    doGet,
    doInsert,
    doList,
    doRemove,
    doPartners    
 } from './controllers/clients.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidGetFields, 
    hasValidListFields,
    hasValidPartnersFields,
    hasValidRemoveFields,
} from './middlewares/verify.clients.middleware.js';

export default function clientsRoutesConfig (app) {
    app.post('/clients/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/clients/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/clients/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/clients/partners', [
        validJWTNeeded,
        hasValidPartnersFields,
        doPartners 
    ]);
    app.post('/clients/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}