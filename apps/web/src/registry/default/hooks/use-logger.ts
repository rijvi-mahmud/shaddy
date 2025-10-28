import { useCallback, useMemo } from 'react'

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

// Log colors for browser console
const LOG_COLORS = {
  debug: '#6366f1', // indigo
  info: '#3b82f6', // blue
  warn: '#f59e0b', // amber
  error: '#ef4444', // red
  success: '#10b981', // green
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

// Logger configuration interface
export interface LoggerConfig {
  /** Minimum log level to display */
  level?: LogLevel
  /** Enable/disable logging */
  enabled?: boolean
  /** Show timestamps */
  showTimestamp?: boolean
  /** Custom timestamp format */
  timestampFormat?: 'iso' | 'locale' | 'time' | 'custom'
  /** Custom timestamp formatter */
  customTimestampFormatter?: () => string
  /** Prefix for all log messages */
  prefix?: string
  /** Enable colored output (browser only) */
  colored?: boolean
  /** Enable stack traces for errors */
  showStackTrace?: boolean
  /** Custom log handler */
  customHandler?: (level: string, message: string, data?: any[]) => void
  /** Environment-based filtering (only log in development) */
  devOnly?: boolean
  /** Group related logs */
  groupName?: string
}

const defaultConfig: LoggerConfig = {
  level: LogLevel.DEBUG,
  enabled: true,
  showTimestamp: true,
  timestampFormat: 'iso',
  colored: true,
  showStackTrace: true,
  devOnly: false,
}

/**
 * Advanced logger hook with extensive customization options
 *
 * @param config - Logger configuration options
 * @returns Logger instance with various logging methods
 *
 * @example
 * ```tsx
 * const logger = useLogger({
 *   level: LogLevel.INFO,
 *   prefix: "MyApp",
 *   colored: true,
 *   devOnly: true
 * });
 *
 * logger.info("User logged in", { userId: 123 });
 * logger.error("Failed to fetch data", error);
 * ```
 */
export const useLogger = (config: LoggerConfig = {}) => {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config]
  )

  // Check if logging is enabled
  const isEnabled = useCallback(() => {
    if (!mergedConfig.enabled) return false
    if (mergedConfig.devOnly && process.env.NODE_ENV === 'production')
      return false
    // Skip logging on server-side if not explicitly handling it
    if (!isBrowser && !mergedConfig.customHandler) return false
    return true
  }, [mergedConfig.enabled, mergedConfig.devOnly, mergedConfig.customHandler])

  // Check if log level should be displayed
  const shouldLog = useCallback(
    (level: LogLevel) => {
      if (!isEnabled()) return false
      return level >= (mergedConfig.level ?? LogLevel.DEBUG)
    },
    [isEnabled, mergedConfig.level]
  )

  // Format timestamp
  const getTimestamp = useCallback(() => {
    if (!mergedConfig.showTimestamp) return ''

    const now = new Date()

    switch (mergedConfig.timestampFormat) {
      case 'locale':
        return now.toLocaleString()
      case 'time':
        return now.toLocaleTimeString()
      case 'custom':
        return mergedConfig.customTimestampFormatter?.() ?? now.toISOString()
      case 'iso':
      default:
        return now.toISOString()
    }
  }, [
    mergedConfig.showTimestamp,
    mergedConfig.timestampFormat,
    mergedConfig.customTimestampFormatter,
  ])

  // Format log message
  const formatMessage = useCallback(
    (level: string, message: string) => {
      const parts: string[] = []

      if (mergedConfig.showTimestamp) {
        parts.push(`[${getTimestamp()}]`)
      }

      if (mergedConfig.prefix) {
        parts.push(`[${mergedConfig.prefix}]`)
      }

      parts.push(`[${level.toUpperCase()}]`)
      parts.push(message)

      return parts.join(' ')
    },
    [mergedConfig.showTimestamp, mergedConfig.prefix, getTimestamp]
  )

  // Colored console output
  const logWithColor = useCallback(
    (
      level: keyof typeof LOG_COLORS,
      message: string,
      ...optionalParams: any[]
    ) => {
      if (mergedConfig.colored && isBrowser) {
        console.log(
          `%c${formatMessage(level, message)}`,
          `color: ${LOG_COLORS[level]}; font-weight: bold;`,
          ...optionalParams
        )
      } else {
        console.log(formatMessage(level, message), ...optionalParams)
      }
    },
    [mergedConfig.colored, formatMessage]
  )

  // Core logging function
  const log = useCallback(
    (
      level: LogLevel,
      levelName: string,
      message: string,
      ...optionalParams: any[]
    ) => {
      if (!shouldLog(level)) return

      // Use custom handler if provided
      if (mergedConfig.customHandler) {
        mergedConfig.customHandler(levelName, message, optionalParams)
        return
      }

      // Group logs if groupName is provided
      if (mergedConfig.groupName) {
        console.group(mergedConfig.groupName)
      }

      const formattedMessage = formatMessage(levelName, message)

      switch (level) {
        case LogLevel.DEBUG:
          if (mergedConfig.colored) {
            logWithColor('debug', message, ...optionalParams)
          } else {
            console.debug(formattedMessage, ...optionalParams)
          }
          break
        case LogLevel.INFO:
          if (mergedConfig.colored) {
            logWithColor('info', message, ...optionalParams)
          } else {
            console.info(formattedMessage, ...optionalParams)
          }
          break
        case LogLevel.WARN:
          console.warn(formattedMessage, ...optionalParams)
          break
        case LogLevel.ERROR:
          console.error(formattedMessage, ...optionalParams)
          if (
            mergedConfig.showStackTrace &&
            optionalParams[0] instanceof Error
          ) {
            console.error('Stack trace:', optionalParams[0].stack)
          }
          break
      }

      if (mergedConfig.groupName) {
        console.groupEnd()
      }
    },
    [shouldLog, mergedConfig, formatMessage, logWithColor]
  )

  // Logger methods
  const debug = useCallback(
    (message: string, ...optionalParams: any[]) => {
      log(LogLevel.DEBUG, 'debug', message, ...optionalParams)
    },
    [log]
  )

  const info = useCallback(
    (message: string, ...optionalParams: any[]) => {
      log(LogLevel.INFO, 'info', message, ...optionalParams)
    },
    [log]
  )

  const warn = useCallback(
    (message: string, ...optionalParams: any[]) => {
      log(LogLevel.WARN, 'warn', message, ...optionalParams)
    },
    [log]
  )

  const error = useCallback(
    (message: string, ...optionalParams: any[]) => {
      log(LogLevel.ERROR, 'error', message, ...optionalParams)
    },
    [log]
  )

  const success = useCallback(
    (message: string, ...optionalParams: any[]) => {
      if (!shouldLog(LogLevel.INFO)) return

      if (mergedConfig.customHandler) {
        mergedConfig.customHandler('success', message, optionalParams)
        return
      }

      if (mergedConfig.groupName) {
        console.group(mergedConfig.groupName)
      }

      if (mergedConfig.colored) {
        logWithColor('success', message, ...optionalParams)
      } else {
        console.log(formatMessage('success', message), ...optionalParams)
      }

      if (mergedConfig.groupName) {
        console.groupEnd()
      }
    },
    [shouldLog, mergedConfig, formatMessage, logWithColor]
  )

  // Table logging for structured data
  const table = useCallback(
    (data: any, columns?: string[]) => {
      if (!shouldLog(LogLevel.INFO)) return

      // console.table doesn't work well in Node.js, skip on server
      if (!isBrowser) {
        console.log(formatMessage('table', 'Data:'), data)
        return
      }

      if (mergedConfig.groupName) {
        console.group(mergedConfig.groupName)
      }

      console.table(data, columns)

      if (mergedConfig.groupName) {
        console.groupEnd()
      }
    },
    [shouldLog, mergedConfig.groupName, formatMessage]
  )

  // Group logs
  const group = useCallback(
    (label: string, callback: () => void, collapsed = false) => {
      if (!isEnabled()) return

      if (collapsed) {
        console.groupCollapsed(label)
      } else {
        console.group(label)
      }

      callback()
      console.groupEnd()
    },
    [isEnabled]
  )

  // Time measurement
  const time = useCallback(
    (label: string) => {
      if (!isEnabled()) return
      console.time(label)
    },
    [isEnabled]
  )

  const timeEnd = useCallback(
    (label: string) => {
      if (!isEnabled()) return
      console.timeEnd(label)
    },
    [isEnabled]
  )

  // Assert logging
  const assert = useCallback(
    (condition: boolean, message: string, ...optionalParams: any[]) => {
      if (!shouldLog(LogLevel.ERROR)) return
      console.assert(
        condition,
        formatMessage('assert', message),
        ...optionalParams
      )
    },
    [shouldLog, formatMessage]
  )

  // Trace logging
  const trace = useCallback(
    (message: string, ...optionalParams: any[]) => {
      if (!shouldLog(LogLevel.DEBUG)) return
      console.trace(formatMessage('trace', message), ...optionalParams)
    },
    [shouldLog, formatMessage]
  )

  // Clear console
  const clear = useCallback(() => {
    if (!isEnabled()) return
    console.clear()
  }, [isEnabled])

  return {
    debug,
    info,
    warn,
    error,
    success,
    table,
    group,
    time,
    timeEnd,
    assert,
    trace,
    clear,
    config: mergedConfig,
  }
}
