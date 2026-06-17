"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = logInfo;
exports.logError = logError;
exports.logSuccess = logSuccess;
function logInfo(message) {
    console.log(`[INFO]: ❌ ${message}`);
}
function logError(message) {
    console.error(`[ERROR]: ❌ ${message}`);
}
function logSuccess(message) {
    console.log(`[SUCCESS]: ❌ ${message}`);
}
//# sourceMappingURL=logger.js.map