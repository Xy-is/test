import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { dataSource } from './dataSource';
config();
@Module({
  imports: [TypeOrmModule.forRoot({ ...dataSource.options })],
})
export class DatabaseModule {}
