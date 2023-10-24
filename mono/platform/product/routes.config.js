import { 
    doGet,
    doInsert,
    doList,
    doRemove,
    doCompanies    
 } from './controllers/product.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidGetFields, 
    hasValidListFields,
    hasValidCompaniesFields,
    hasValidRemoveFields,
} from './middlewares/verify.product.middleware.js';

export default function productRoutesConfig (app) {
    app.post('/product/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/product/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/product/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/product/companies', [
        validJWTNeeded,
        hasValidCompaniesFields,
        doCompanies 
    ]);
    app.post('/product/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}