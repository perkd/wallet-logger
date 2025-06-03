/**
 * Lightweight Logging System
 *
 * A simple, secure logging utility that provides different log levels
 * and automatically disables verbose logging in production.
 *
 * Also supports benchmarking mode where logs are suppressed to avoid affecting performance measurements.
 */
/**
 * Log levels in order of increasing severity
 */
export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}
/**
 * Logger interface
 */
export interface Logger {
    debug(module: string, message: string, data?: any): void;
    info(module: string, message: string, data?: any): void;
    warn(module: string, message: string, data?: any): void;
    error(module: string, message: string, error?: Error, data?: any): void;
    benchmark(module: string, message: string, duration: number, data?: any): void;
}
/**
 * Logger implementation
 */
declare const logger: Logger;
export default logger;
//# sourceMappingURL=Logger.d.ts.map