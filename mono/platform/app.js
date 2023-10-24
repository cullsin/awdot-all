import DotEnv from 'dotenv';
DotEnv.config();
import express, { json } from 'express';
import staticRoutesConfig from './static/routes.config.js';
import authRoutesConfig from './authorization/routes.config.js';
import bankRoutesConfig from './bank/routes.config.js';
import categoriesRoutesConfig from './categories/routes.config.js';
import interestRoutesConfig from './interest/routes.config.js';
import productRoutesConfig from './product/routes.config.js';
import profileRoutesConfig from './profile/routes.config.js';
import partnersRoutesConfig from './partners/routes.config.js';
import proposalRoutesConfig from './proposal/routes.config.js';
import userRoutesConfig from './user/routes.config.js';
import walletRoutesConfig from './wallet/routes.config.js';
import messageRoutesConfig from './message/routes.config.js';
import companiesRoutesConfig from './companies/routes.config.js';
import investmentRoutesConfig from './investment/routes.config.js';
import domainRoutesConfig from './domain/routes.config.js';
import purchaseRoutesConfig from './purchase/routes.config.js';
import redeemRoutesConfig from './redeem/routes.config.js';
import sharesRoutesConfig from './shares/routes.config.js';
import transactionRoutesConfig from './transaction/routes.config.js';
import stripeRoutesConfig from './stripe/routes.config.js';
import fileRoutesConfig from './file/routes.config.js';
import fileConnectRoutesConfig from './fileConnect/routes.config.js';
import clientsRoutesConfig from './clients/routes.config.js';

import fileUpload from 'express-fileupload';
const port = process.env.PORT;
const app = express();
app.use(fileUpload({ createParentPath: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(json());
staticRoutesConfig(app);
authRoutesConfig(app);
userRoutesConfig(app);
bankRoutesConfig(app);
profileRoutesConfig(app);
partnersRoutesConfig(app);
walletRoutesConfig(app);
messageRoutesConfig(app);
companiesRoutesConfig(app);
investmentRoutesConfig(app);
purchaseRoutesConfig(app);
redeemRoutesConfig(app);
categoriesRoutesConfig(app);
interestRoutesConfig(app);
productRoutesConfig(app);
sharesRoutesConfig(app);
stripeRoutesConfig(app);
transactionRoutesConfig(app);
proposalRoutesConfig(app);
fileRoutesConfig(app);
fileConnectRoutesConfig(app);
clientsRoutesConfig(app);
domainRoutesConfig(app);

app.timeout = 50000;

app.listen(port, function () {
    console.log('app listening at port %s', port);
});