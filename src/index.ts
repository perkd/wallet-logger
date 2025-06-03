/**
 * @perkd/wallet-logger
 * 
 * Centralized logging with environment-aware behavior for Perkd wallet packages
 */

// Main exports
export { default as logger, LogLevel } from './Logger'
export type { Logger } from './Logger'

// Type definitions
export type { LoggerProvider } from './types'

// Version information
export const VERSION = '1.0.0'
export const PACKAGE_NAME = '@perkd/wallet-logger'
