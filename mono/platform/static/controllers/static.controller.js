import isoCountry from '../../data/countryIso3.js';
import countryNames from '../../data/countryNames.js';
import currencyCodes from '../../data/currencyCodes.js';
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

export const getDialCode = (req, res, next) => {
    res.status(200).send({success : true, countries });
}