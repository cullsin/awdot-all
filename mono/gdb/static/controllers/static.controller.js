import isoCountry from '../../data/countryIso3.js';
import countryNames from '../../data/countryNames.js';
import currencyCodes from '../../data/currencyCodes.js';
import companies from '../../data/companies.js';
import dialCodes from '../../data/dialCode.js';

const countries = [];
Object.keys(countryNames).map((item) => {
      const country = {};
      country.name = countryNames[item];
      country.iso2 = item;
      country.iso3 = isoCountry[item];
      country.currency = currencyCodes[item];
      country.dialCode = dialCodes[item];
      countries.push(country);  
})

export const getCountryList = (req, res, next) => {
    res.status(200).send({success : true, countries });
}

export const getCurrencyList = (req, res, next) => {
    res.status(200).send({success : true, countries });
}

export const getCompaniesList = (req, res, next) => {
    let list = [];
    for (let index = 0; index < 14; index++) {
        const item = companies.data[Math.floor(Math.random() * companies.data.length)];
        list.push(item); 
    }
    res.status(200).send({success : true, 
        code: 'GDB-001',
        companies: list, 
        message: 'Companies Information fetched successfully'});
}

export const getDialCode = (req, res, next) => {
    res.status(200).send({success : true, countries });
}