import { LoggerService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class Logger implements LoggerService {
  private readonly logsDir: string = path.join(__dirname, '..', 'logs');
  private readonly logsPath: string = path.join(this.logsDir, 'logs.log');
  private readonly errorLogsPath: string = path.join(
    this.logsDir,
    'errors.log',
  );

  constructor() {
    this.ensureLogsDirExists();
  }

  private ensureLogsDirExists() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  logApi(message: any) {
    const logMessage = JSON.stringify(message) + '\n';
    console.log(logMessage);
    fs.appendFile(this.logsPath, logMessage, (error) => {
      if (error) {
        console.error('Error logging API call:', error);
      }
    });
  }

  log(message: any) {}

  error(message: any) {
    console.error(message);
    const logMessage = JSON.stringify(message) + '\n';
    fs.appendFile(this.errorLogsPath, logMessage, (error) => {
      if (error) {
        console.error('Error logging error:', error);
      }
    });
  }

  warn(message: any) {
    console.warn(message);
  }

  fatal(message: any) {
    console.error(message);
  }
}
