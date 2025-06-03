# @perkd/wallet-logger

Centralized logging with environment-aware behavior for Perkd wallet packages.

## Features

- **Environment-Aware**: Automatically adjusts log levels based on development/production environment
- **Security-First**: Automatically sanitizes sensitive data (tokens, passwords, secrets)
- **Benchmark Integration**: Integrates with @perkd/wallet-utils Benchmark system
- **Multiple Log Levels**: DEBUG, INFO, WARN, ERROR with appropriate filtering
- **Future-Ready**: Prepared for Bugsnag integration for production error tracking

## Installation

```bash
npm install github:perkd/wallet-logger
```

Note: This package requires `@perkd/wallet-utils` as a peer dependency.

## Usage

### Basic Logging

```typescript
import {logger} from '@perkd/wallet-logger';

// Debug information (development only)
logger.debug('MyModule', 'Processing user data', {userId: '123'});

// General information
logger.info('MyModule', 'User logged in successfully', {userId: '123'});

// Warnings
logger.warn('MyModule', 'API rate limit approaching', {remaining: 10});

// Errors
logger.error('MyModule', 'Failed to save user data', error, {userId: '123'});

// Benchmark results
logger.benchmark('MyModule', 'Data processing completed', 150.5, {
  records: 100,
});
```

### Security Features

The logger automatically sanitizes sensitive data:

```typescript
// This data will be automatically sanitized
const sensitiveData = {
  username: 'john',
  password: 'secret123', // Will be redacted
  token: 'abc123', // Will be redacted
  apiKey: 'xyz789', // Will be redacted
};

logger.info('Auth', 'User data processed', sensitiveData);
// Output: { username: 'john', password: '[REDACTED]', token: '[REDACTED]', apiKey: '[REDACTED]' }
```

### Environment Behavior

- **Development (`__DEV__ = true`)**: All log levels are shown in console
- **Production (`__DEV__ = false`)**: Only errors are shown in console, all logs are sent to Bugsnag (when configured)

### Benchmark Integration

The logger automatically respects benchmark mode:

```typescript
import {Benchmark} from '@perkd/wallet-utils';

// Enable benchmark mode - this will suppress all logging to avoid affecting measurements
Benchmark.enableOnScreenDisplay(true);

// These logs will be suppressed during benchmarking
logger.info('Performance', 'This will not appear during benchmarks');

// Disable benchmark mode
Benchmark.enableOnScreenDisplay(false);

// Logs will appear normally again
logger.info('Performance', 'This will appear normally');
```

## API Reference

### logger

- `debug(module: string, message: string, data?: any): void` - Log debug information (development only)
- `info(module: string, message: string, data?: any): void` - Log general information
- `warn(module: string, message: string, data?: any): void` - Log warnings
- `error(module: string, message: string, error?: Error, data?: any): void` - Log errors
- `benchmark(module: string, message: string, duration: number, data?: any): void` - Log benchmark results

### Types

- `Logger` - Interface for logger implementations
- `LoggerProvider` - Interface for logger provider implementations
- `LogLevel` - Enum for log levels (DEBUG, INFO, WARN, ERROR)

## Integration with Other Packages

This package is designed to work seamlessly with other @perkd packages:

- **@perkd/wallet-utils**: Uses Benchmark class for benchmark-aware logging
- **@perkd/wallet-remote**: Can be used for API request/response logging
- **@perkd/wallet-sync**: Can be used for sync operation logging

## License

MIT
