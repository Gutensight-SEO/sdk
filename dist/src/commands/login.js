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
        if (!apiKey) {
            console.error('API key must be at least 8 alphanumeric characters.');
            return;
        }
        console.log("Authenticating...");
        // const response = await axios.post('http://localhost:10000/api/v1/analyze/api-key', { apiKey });
        const response = await axios_1.default.post('https://gs-server-hzfd.onrender.com/api/v1/analyze/api-key', { apiKey });
        console.log("Response gotten:", response.data);
        if (response.data.success) {
            config.set('apiKey', apiKey);
            console.log('✅ Login successful!');
        }
        else if (response.data.error) {
            console.error(`❌ ${response.data.error}`);
        }
    }
    catch (error) {
        if (error.message == "Request failed with status code 400")
            console.error('❌ Error during login:', "API key is missing");
        else if (error.message == "Request failed with status code 404")
            console.error('❌ Error during login:', "Invalid API key");
        else if (error.message == "Request failed with status code 401")
            console.error('❌ Error during login:', "Quota Exceeded");
        else
            console.error('❌ Error occured during login. Try again later');
    }
}
//# sourceMappingURL=login.js.map