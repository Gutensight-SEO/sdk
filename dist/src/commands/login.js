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
    while (true) { // Loop until successful login
        try {
            const { apiKey } = await inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'apiKey',
                    message: 'Enter your API key:',
                    validate: (input) => input.length >= 8 && /^[a-zA-Z0-9]+$/.test(input)
                        ? true
                        : 'API key must be at least 8 alphanumeric characters.',
                },
            ]);
            const response = await axios_1.default.post('https://gs-server-hzfd.onrender.com/api/v1/api-key', { apiKey });
            if (response.data.valid) {
                config.set('apiKey', apiKey);
                console.log('✅ Login successful!');
                break; // Exit loop on success
            }
            else {
                console.error('❌ Invalid API key. Please try again.');
            }
        }
        catch (error) {
            console.error(`❌ Error during login: ${error.message}`);
            // Loop continues automatically
        }
    }
}
//# sourceMappingURL=login.js.map