import { 
    doInsert,
    doGet,
    doRemove,
} from './controllers/file.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidRemoveFields,
    hasValidGetFields
} from './middlewares/verify.file.middleware.js';

export default function fileRoutesConfig (app) {
    app.post('/file/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/file/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/file/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}