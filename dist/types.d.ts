/**
 * Type definitions for the wallet logger package
 */
import { LogLevel, Logger } from './Logger';
/**
 * Interface for logger provider implementations
 */
export interface LoggerProvider {
    debug(module: string, message: string, data?: any): void;
    info(module: string, message: string, data?: any): void;
    warn(module: string, message: string, data?: any): void;
    error(module: string, message: string, error?: Error, data?: any): void;
    benchmark(module: string, message: string, duration: number, data?: any): void;
}
export type { Logger };
export { LogLevel };
//# sourceMappingURL=types.d.ts.map