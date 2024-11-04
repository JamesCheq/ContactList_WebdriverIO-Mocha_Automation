import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { format } from 'date-fns';

class LoggingUtility {
    static logBasePath = path.join(process.cwd(), 'logs');
    static currentDate = format(new Date(), 'yyyyMMdd'); // Format for log filename
    static logFileName = `test_logs_${LoggingUtility.currentDate}.txt`; // Log file name per day
    static logger = null;

    static initializeLogger() {
        // Check if the log file exists
        const logFilePath = path.join(this.logBasePath, this.logFileName);

        // Create logger instance
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => `${timestamp} - ${level.toUpperCase()} - ${message}`)
            ),
            transports: [
                new winston.transports.File({
                    filename: logFilePath,
                    level: 'debug',
                    options: { flags: 'a' } // Append mode
                })
            ]
        });
    }

    static logMessage(level, message) {
        // Initialize logger if it hasn't been already
        if (!this.logger) {
            this.initializeLogger();
        }

        // Log the message
        this.logger.log(level, message);
    }
}

export default LoggingUtility;
