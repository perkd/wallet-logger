/**
 * Lightweight Logging System
 *
 * A simple, secure logging utility that provides different log levels
 * and automatically disables verbose logging in production.
 *
 * Also supports benchmarking mode where logs are suppressed to avoid affecting performance measurements.
 */

import { Benchmark } from '@perkd/wallet-utils'

/**
 * Log levels in order of increasing severity
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Minimum log level based on environment
 * - In development: Show all logs (DEBUG and above)
 * - In production: No console logs (higher than ERROR)
 */
const MIN_CONSOLE_LOG_LEVEL = typeof __DEV__ !== 'undefined' && __DEV__ ? LogLevel.DEBUG : LogLevel.ERROR + 1

/**
 * Format a log message with timestamp and module
 */
const formatMessage = (level: string, module: string, message: string): string => {
  const timestamp = new Date().toISOString()
  return `[${timestamp}] [${level}] [${module}] ${message}`
}

/**
 * Sanitize data for logging to prevent sensitive information leakage
 */
const sanitizeData = (data: any): any => {
  if (!data) return data

  // If it's a string, check for sensitive patterns
  if (typeof data === 'string') {
    // Remove potential tokens, passwords, or sensitive data
    return data
      .replace(/token["\s]*[:=]["\s]*[^"\s,}]+/gi, 'token: "[REDACTED]"')
      .replace(/password["\s]*[:=]["\s]*[^"\s,}]+/gi, 'password: "[REDACTED]"')
      .replace(/secret["\s]*[:=]["\s]*[^"\s,}]+/gi, 'secret: "[REDACTED]"')
      .replace(/key["\s]*[:=]["\s]*[^"\s,}]+/gi, 'key: "[REDACTED]"')
  }

  // If it's an object, recursively sanitize
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = Array.isArray(data) ? [] : {}
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Check if the key itself suggests sensitive data
        const lowerKey = key.toLowerCase()
        if (lowerKey.includes('token') || 
            lowerKey.includes('password') || 
            lowerKey.includes('secret') || 
            lowerKey.includes('key')) {
          sanitized[key] = '[REDACTED]'
        } else {
          sanitized[key] = sanitizeData(data[key])
        }
      }
    }
    
    return sanitized
  }

  return data
}

/**
 * Send log to Bugsnag (placeholder for future implementation)
 */
const sendToBugsnag = (level: string, message: string, metadata: any): void => {
  // Placeholder for Bugsnag integration
  // This will be implemented when Bugsnag is added to the project
}

/**
 * Report error to Bugsnag
 * This is a placeholder for future Bugsnag integration
 */
const reportErrorToBugsnag = (error: Error, metadata: any): void => {
  // Placeholder for Bugsnag integration
  // Uncomment and implement when Bugsnag is added
  /*
  if (global.bugsnag) {
    global.bugsnag.notify(error, event => {
      event.addMetadata('context', metadata);
    });
  }
  */
}

/**
 * Logger interface
 */
export interface Logger {
  debug(module: string, message: string, data?: any): void
  info(module: string, message: string, data?: any): void
  warn(module: string, message: string, data?: any): void
  error(module: string, message: string, error?: Error, data?: any): void
  benchmark(
    module: string,
    message: string,
    duration: number,
    data?: any,
  ): void
}

/**
 * Logger implementation
 */
const logger: Logger = {
  /**
   * Log debug information (development only)
   */
  debug(module: string, message: string, data?: any): void {
    // Skip logging during benchmarking to avoid affecting measurements
    if (Benchmark.isOnScreenDisplayEnabled()) {
      return
    }

    if (LogLevel.DEBUG >= MIN_CONSOLE_LOG_LEVEL) {
      console.debug(formatMessage('DEBUG', module, message), data || '')
    }

    // Debug logs are not sent to Bugsnag to reduce noise
  },

  /**
   * Log general information
   */
  info(module: string, message: string, data?: any): void {
    // Skip logging during benchmarking to avoid affecting measurements
    if (Benchmark.isOnScreenDisplayEnabled()) {
      return
    }

    if (LogLevel.INFO >= MIN_CONSOLE_LOG_LEVEL) {
      console.info(
        formatMessage('INFO', module, message),
        data ? sanitizeData(data) : '',
      )
    }

    // Send to Bugsnag (when implemented)
    sendToBugsnag('info', message, {
      module,
      data: sanitizeData(data),
    })
  },

  /**
   * Log warnings that don't break functionality
   */
  warn(module: string, message: string, data?: any): void {
    // Skip logging during benchmarking to avoid affecting measurements
    if (Benchmark.isOnScreenDisplayEnabled()) {
      return
    }

    if (LogLevel.WARN >= MIN_CONSOLE_LOG_LEVEL) {
      console.warn(
        formatMessage('WARN', module, message),
        data ? sanitizeData(data) : '',
      )
    }

    // Send to Bugsnag (when implemented)
    sendToBugsnag('warning', message, {
      module,
      data: sanitizeData(data),
    })
  },

  /**
   * Log errors that affect functionality
   */
  error(module: string, message: string, error?: Error, data?: any): void {
    // Always log errors to console in development
    if (LogLevel.ERROR >= MIN_CONSOLE_LOG_LEVEL) {
      console.error(
        formatMessage('ERROR', module, message),
        error || '',
        data ? sanitizeData(data) : '',
      )
    }

    // Report to Bugsnag (when implemented)
    if (error) {
      reportErrorToBugsnag(error, {
        module,
        message,
        data: sanitizeData(data),
      })
    } else {
      // If no error object provided, still leave a breadcrumb
      sendToBugsnag('error', message, {
        module,
        data: sanitizeData(data),
      })
    }
  },

  /**
   * Log benchmark results
   * Skip logging during benchmarking to avoid affecting measurements
   */
  benchmark(
    module: string,
    message: string,
    duration: number,
    data?: any,
  ): void {
    // Skip logging during benchmarking to avoid affecting measurements
    if (Benchmark.isOnScreenDisplayEnabled()) {
      return
    }

    // Only log benchmark results in development
    if (LogLevel.INFO >= MIN_CONSOLE_LOG_LEVEL) {
      console.info(
        formatMessage(
          'BENCHMARK',
          module,
          `${message} (${duration.toFixed(2)}ms)`,
        ),
        data ? sanitizeData(data) : '',
      )
    }

    // Send to Bugsnag (when implemented)
    sendToBugsnag('info', `BENCHMARK: ${message}`, {
      module,
      duration,
      data: sanitizeData(data),
    })
  },
}

export default logger
