import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasBankUserFields,
    hasBankInsertFields,
    hasBankRemoveFields
 } from './middlewares/verify.bank.middleware.js';
import {
    getBanksByUser,
    removeBankById,
    doInsert
} from './controllers/bank.controller.js';

export default function bankRoutesConfig(app) {
    app.post('/bank/getByUser', [
        validJWTNeeded,
        hasBankUserFields,
        getBanksByUser
    ]);

    app.post('/bank/insert', [
        validJWTNeeded,
        hasBankInsertFields,
        doInsert
    ]);

    app.post('/bank/remove', [
        validJWTNeeded,
        hasBankRemoveFields,
        removeBankById
    ]);
}