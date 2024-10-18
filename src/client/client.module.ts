import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, DatabaseService],
})
export class ClientModule {}
