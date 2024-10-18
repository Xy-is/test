import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class DatabaseService {
  pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
    });
  }

  async query(queryText: string, params: any[] = []) {
    try {
      const result = await this.pool.query(queryText, params);
      return result;
    } catch (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }
  }
}
