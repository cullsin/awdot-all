import os, { hostname } from 'os'; 
import fs from 'fs';

const host = os.hostname();

if(host.toLowerCase().includes('desktop') === false) {
    fs.copyFileSync('.env.production.conf', '.env');
} else {
    fs.copyFileSync('.env.development.conf', '.env');
}

import DotEnv from 'dotenv';
DotEnv.config();

// include at last for all the init. Because of env.
async function main() {
  let mod = await import('./app.js')
}
main();