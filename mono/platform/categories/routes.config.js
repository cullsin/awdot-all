import { 
    doGet,
    doInsert,
    doList,
    doRemove,
    doCompanies    
 } from './controllers/categories.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidGetFields, 
    hasValidListFields,
    hasValidCompaniesFields,
    hasValidRemoveFields,
} from './middlewares/verify.categories.middleware.js';

export default function categoriesRoutesConfig (app) {
    app.post('/categories/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/categories/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/categories/list', [
        validJWTNeeded,
        hasValidListFields,
        doList 
    ]);
    app.post('/categories/companies', [
        validJWTNeeded,
        hasValidCompaniesFields,
        doCompanies 
    ]);
    app.post('/categories/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}