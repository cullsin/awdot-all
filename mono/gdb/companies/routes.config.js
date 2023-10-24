import { 
    doSearch,
    doMail
} from './controllers/index.js';
import { validJWTNeeded } from '../common/middlewares/index.js';
import {  
    hasValidSearchFields,
    hasValidMailFields
} from './middlewares/index.js';

export default function companiesRoutesConfig (app) {
    app.post('/gdb/search', [
        validJWTNeeded, 
        hasValidSearchFields,
        doSearch
    ]);

    app.post('/gdb/mail', [
        validJWTNeeded, 
        hasValidMailFields,
        doMail
    ]);
}