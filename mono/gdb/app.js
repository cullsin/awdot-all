import DotEnv from 'dotenv';
DotEnv.config();
import express, { json } from 'express';
import staticRoutesConfig from './static/routes.config.js';
import companiesRoutesConfig from './companies/routes.config.js';
const port = process.env.PORT;
const app = express();
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
companiesRoutesConfig(app);

app.timeout = 50000;

app.listen(port, function () {
    console.log('app listening at port %s', port);
});