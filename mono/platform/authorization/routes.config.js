import { hasAuthValidFields, isPasswordAndUserMatch } from './middlewares/verify.user.middleware.js';
import { hasGenericAuthValidFields } from './middlewares/verify.generic.middleware.js';
import { generic, login } from './controllers/authorization.controller.js';
import { validJWTNeeded, verifyRefreshBodyField, validRefreshNeeded } from '../common/middlewares/auth.validation.middleware.js';

const authRoutesConfig = (app) => {
    app.post('/auth/generic', [
        hasGenericAuthValidFields,
        generic
    ]);

    app.post('/auth/login', [
        validJWTNeeded,
        hasAuthValidFields,
        isPasswordAndUserMatch,
        login
    ]);

    app.post('/auth/refresh', [
        validJWTNeeded,
        hasAuthValidFields,
        verifyRefreshBodyField,
        validRefreshNeeded,
        login
    ]);
}

export default authRoutesConfig;