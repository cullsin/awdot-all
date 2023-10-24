import { getCountryList,getCurrencyList,getDialCode, getCompaniesList } from './controllers/static.controller.js'
import { validJWTNeeded } from '../common/middlewares/index.js';
export default function staticRoutesConfig (app) {
    app.post('/static/country', [
        validJWTNeeded,
        getCountryList 
    ]);
    app.post('/static/currency', [
        validJWTNeeded, 
        getCurrencyList
    ]);
    app.post('/static/companies', [
        validJWTNeeded, 
        getCompaniesList
    ]);
    app.post('/static/dialCode', [
        validJWTNeeded,
        getDialCode 
    ]);    
}