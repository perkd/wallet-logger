"use strict";
/**
 * @perkd/wallet-logger
 *
 * Centralized logging with environment-aware behavior for Perkd wallet packages
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE_NAME = exports.VERSION = exports.LogLevel = exports.logger = void 0;
// Main exports
var Logger_1 = require("./Logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return __importDefault(Logger_1).default; } });
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return Logger_1.LogLevel; } });
// Version information
exports.VERSION = '1.0.0';
exports.PACKAGE_NAME = '@perkd/wallet-logger';
//# sourceMappingURL=index.js.map