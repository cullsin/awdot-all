import https from '../../axios';
export const generateStripeClientKey = async (params) => {
    try {
        const {
            amount, currency, purchase_id,
            firstName, email, lastName, city, Country, phone, line1, line2,
            postal_code, state, payment_method
        } = params;
        return await https.post('/stripe/generateStripeClientKey', {
            amount, currency, purchase_id,
            firstName, email, lastName, city, Country, phone, line1, line2,
            postal_code, state, payment_method
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const stripeReturnResponse = async (params) => {
    try {
        const {
            purchase_id,
            payment_intent } = params
        return await https.post('/stripe/stripeReturnResponse', {
            purchase_id, payment_intent
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doStripeTransfer = async (params) => {
    try {
        return await https.post('/stripe/transfer', params);
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

