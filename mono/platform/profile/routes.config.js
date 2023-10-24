import { doInsert, doUser, doUpdate } from './controllers/profile.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasProfileValidInsertFields, 
        hasProfileValidUserFields,
        hasProfileValidUpdateFields } from './middlewares/verify.profile.middleware.js';

export default function profileRoutesConfig (app) {
    app.post('/profile/insert', [
        validJWTNeeded,
        hasProfileValidInsertFields,
     	doInsert
    ]);
    
    app.post('/profile/update', [
        validJWTNeeded, 
        hasProfileValidUpdateFields,
        doUpdate
    ]);
    app.post('/profile/user', [
        validJWTNeeded,
        hasProfileValidUserFields,
        doUser
    ]);
}