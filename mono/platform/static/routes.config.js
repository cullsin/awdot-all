import { getCountryList,getCurrencyList,getDialCode } from './controllers/static.controller.js'
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
export default function staticRoutesConfig (app) {
    app.post('/static/country', [
        validJWTNeeded,
        getCountryList 
    ]);
    app.post('/static/currency', [
        validJWTNeeded, 
        getCurrencyList
    ]);
    app.post('/static/dialCode', [
        validJWTNeeded,
        getDialCode 
    ]);    
}