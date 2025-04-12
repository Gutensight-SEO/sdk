"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = logout;
const configstore_1 = __importDefault(require("configstore"));
const config = new configstore_1.default('gutensight-seo');
function logout() {
    try {
        config.delete('apiKey');
        console.log('Logged out successfully.');
    }
    catch (error) {
        console.error('Error during logout:', error.message);
    }
}
//# sourceMappingURL=logout.js.map