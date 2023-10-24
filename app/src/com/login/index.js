import https from '../../axios';
export const checkLogin = async (params) => {
    const { email, password} = params;
    try {
        return await https.post('/auth/login', {
            email, password
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}