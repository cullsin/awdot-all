import https from '../../axios';
export const getToken = async () => {
    try {
    return await https.post('/auth/generic', {
        'client_ip': window.location.hostname
    });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}