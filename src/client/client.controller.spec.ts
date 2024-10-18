import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientRequestDTO } from './dto/CreateClientRequestDTO';
import { GetClientsParamsDTO } from './dto/GetClientsParamsDTO';
import { UpdateClientRequestDTO } from './dto/UpdateClientRequestDTO';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            createClient: jest.fn(),
            getAllClients: jest.fn(),
            getClientById: jest.fn(),
            updateClient: jest.fn(),
            deleteClientById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  describe('createClient', () => {
    it('should call service.createClient with correct data', async () => {
      const dto: CreateClientRequestDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      };
      const result = { id: 1, ...dto };

      jest.spyOn(service, 'createClient').mockResolvedValue(result);

      const response = await controller.createClient(dto);
      expect(service.createClient).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe('getAllClients', () => {
    it('should call service.getAllClients with query params', async () => {
      const params: GetClientsParamsDTO = { perPage: 10, page: 1 };
      const result = [{ id: 1, name: 'John Doe' }];

      jest.spyOn(service, 'getAllClients').mockResolvedValue(result);

      const response = await controller.getAllClients(params);
      expect(service.getAllClients).toHaveBeenCalledWith(params);
      expect(response).toEqual(result);
    });
  });

  describe('getClient', () => {
    it('should call service.getClientById with correct id', async () => {
      const clientId = 1;
      const result = { id: 1, name: 'John Doe' };

      jest.spyOn(service, 'getClientById').mockResolvedValue(result);

      const response = await controller.getClient(clientId);
      expect(service.getClientById).toHaveBeenCalledWith(clientId);
      expect(response).toEqual(result);
    });
  });

  describe('updateClient', () => {
    it('should call service.updateClient with correct id and data', async () => {
      const clientId = 1;
      const dto: UpdateClientRequestDTO = { name: 'John Updated' };
      const result = { id: clientId, ...dto };

      jest.spyOn(service, 'updateClient').mockResolvedValue(result);

      const response = await controller.updateClient(dto, clientId);
      expect(service.updateClient).toHaveBeenCalledWith(dto, clientId);
      expect(response).toEqual(result);
    });
  });

  describe('deleteClient', () => {
    it('should call service.deleteClientById with correct id', async () => {
      const clientId = 1;
      const result = {
        statusCode: 200,
        message: `Client with id ${clientId} has been deleted`,
      };

      jest.spyOn(service, 'deleteClientById').mockResolvedValue(result);

      const response = await controller.deleteUser(clientId);
      expect(service.deleteClientById).toHaveBeenCalledWith(clientId);
      expect(response).toEqual(result);
    });
  });
});
