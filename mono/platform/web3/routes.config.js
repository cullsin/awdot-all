import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import {
    hasStripeGenerateClientKeyFields,         
 } from './middlewares/verify.stripe.middleware.js';
import { 
    generateStripeClientKey,
    stripeReturnRequest,
    doTransfer
} from './controllers/stripe.controller.js';
export default function stripeRoutesConfig(app) {
    app.post('/stripe/transfer', [
        validJWTNeeded,
        doTransfer
    ]);

    app.post('/stripe/generateStripeClientKey', [
        validJWTNeeded,
        hasStripeGenerateClientKeyFields,
        generateStripeClientKey
    ]);

    app.post('/stripe/stripeReturnResponse', [
        validJWTNeeded,
        stripeReturnRequest
    ]);
}