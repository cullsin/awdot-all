import { 
    doInsert,
    doGet,
    doRemove,
    doConnect
} from './controllers/fileConnect.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasValidInsertFields, 
    hasValidRemoveFields,
    hasValidGetFields,
    hasValidConnectFields
} from './middlewares/verify.fileConnect.middleware.js';

export default function fileConnectRoutesConfig (app) {
    app.post('/file/connect/insert', [
        validJWTNeeded,
        hasValidInsertFields,
        doInsert
    ]);
    app.post('/file/connect/get', [
        validJWTNeeded, 
        hasValidGetFields,
        doGet
    ]);
    app.post('/file/connect', [
        validJWTNeeded,
        hasValidConnectFields,
        doConnect
    ]);
    app.post('/file/connect/remove', [
        validJWTNeeded,
        hasValidRemoveFields,
        doRemove 
    ]);
}