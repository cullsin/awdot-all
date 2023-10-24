import https, {currencyConversionHttps} from '../../axios';
const key = '9xSRvJtC9GTFfGZKpBl4HqVu6HQkx2T6';
export const currencyConversion = async (params) => {
    const {from, to, amount} = params;
    try {
        return await currencyConversionHttps.get(`base=${from}&symbols=${to}&amount=${amount}`, {
            headers: {
                apikey:key
            }
        });
    } catch(e) {
        return { data: `error ${e}`}
    }
}