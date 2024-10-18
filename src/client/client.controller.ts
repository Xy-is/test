import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { GetClientsParamsDTO } from './dto/GetClientsParamsDTO';
import { CreateClientRequestDTO } from './dto/CreateClientRequestDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClientResponseDTO } from './dto/CreateClientResponseDTO';
import { UpdateClientRequestDTO } from './dto/UpdateClientRequestDTO';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@UseInterceptors(LoggingInterceptor)
@ApiTags('client')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  example: {
    message: ['some field is incorrect'],
    error: 'Bad Request',
    statusCode: 400,
  },
})
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('')
  @ApiOperation({ summary: 'Create client' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateClientResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Client with this email or phone already exists',
    },
  })
  async createClient(@Body() body: CreateClientRequestDTO) {
    return await this.clientService.createClient(body);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateClientResponseDTO] })
  async getAllClients(@Query() params: GetClientsParamsDTO) {
    return await this.clientService.getAllClients(params);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateClientResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Client with id 1 not found',
    },
  })
  async getClient(@Param('id', new ParseIntPipe()) clientId: number) {
    return await this.clientService.getClientById(clientId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update client by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateClientResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 2',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'No fields provided for update',
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'User with this email address or phone is already exists',
    },
  })
  async updateClient(
    @Body() updateClientRequestDTO: UpdateClientRequestDTO,
    @Param('id', new ParseIntPipe()) clientId: number,
  ) {
    return await this.clientService.updateClient(
      updateClientRequestDTO,
      clientId,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete client by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      statusCode: HttpStatus.OK,
      message: 'Client with id 6 has been deleted',
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no clients with this id: 1',
    },
  })
  async deleteUser(@Param('id', new ParseIntPipe()) clientId: number) {
    return await this.clientService.deleteClientById(clientId);
  }
}
