import GoCardless from 'gocardless-nodejs';
import dotenv from 'dotenv';

dotenv.config();

const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');


const client = gocardless(
  process.env.GC_ACCESS_TOKEN,
  constants.Environments.Sandbox,
  { raiseOnIdempotencyConflict: true },
);

console.log('GoCardless Client Initialized:', client);

export { gocardless };
