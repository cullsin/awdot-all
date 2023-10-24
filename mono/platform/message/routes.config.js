import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {         
    hasInsertValidFields,
    hasByEscrowValidFields,
    hasDeleteValidFields
 } from './middlewares/verify.message.middleware.js';
import { 
    deleteMessage,
    insertMessage,
    getMessageByProduct
} from './controllers/message.controller.js';
export default function messageRoutesConfig (app) {
    app.post('/message/insert', [
        validJWTNeeded,
        hasInsertValidFields,
        insertMessage
    ]);

    app.post('/message/getByEscrow', [
        validJWTNeeded,
        hasByEscrowValidFields,
        getMessageByProduct
    ]);

    app.post('/message/delete', [
        validJWTNeeded,
        hasDeleteValidFields,
        deleteMessage
    ]);
}