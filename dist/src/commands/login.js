"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const inquirer_1 = __importDefault(require("inquirer"));
const axios_1 = __importDefault(require("axios"));
const configstore_1 = __importDefault(require("configstore"));
const config = new configstore_1.default('gutensight-seo');
async function login() {
    try {
        const { apiKey } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'apiKey',
                message: 'Enter your API key:',
                validate: (input) => input.length >= 8 && /^[a-zA-Z0-9]+$/.test(input) ? true : 'API key must be at least 8 alphanumeric characters.',
            },
        ]);
        const response = await axios_1.default.post('https://api.example.com/validate-key', { apiKey });
        if (response.data.valid) {
            config.set('apiKey', apiKey);
            console.log('Login successful!');
        }
        else {
            console.error('Invalid API key.');
        }
    }
    catch (error) {
        console.error('Error during login:', error.message);
    }
}
//# sourceMappingURL=login.js.map