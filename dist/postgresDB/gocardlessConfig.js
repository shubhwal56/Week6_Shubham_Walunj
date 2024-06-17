"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gocardless = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const gocardless = require('gocardless-nodejs');
exports.gocardless = gocardless;
const constants = require('gocardless-nodejs/constants');
const client = gocardless(process.env.GC_ACCESS_TOKEN, constants.Environments.Sandbox, { raiseOnIdempotencyConflict: true });
console.log('GoCardless Client Initialized:', client);
//# sourceMappingURL=gocardlessConfig.js.map