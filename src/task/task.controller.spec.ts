import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskRequestDTO } from './dto/CreateTaskRequestDTO';
import { UpdateTaskRequestDTO } from './dto/UpdateTaskRequestDTO';
import { GetTasksParamsDTO } from './dto/GetTasksPatamsDTO';
import { TaskStatusEnum } from './enums/TaskStatusEnum';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            getAllTasks: jest.fn(),
            getTaskById: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController) as TaskController;
    service = module.get<TaskService>(TaskService) as TaskService;
  });

  describe('createTask', () => {
    it('should call service.createTask with correct data', async () => {
      const dto: CreateTaskRequestDTO = {
        user_id: 1,
        title: 'Test Task',
        description: 'Test Description',
      };
      const result = { id: 1, ...dto, status: TaskStatusEnum.PENDING };

      jest.spyOn(service, 'createTask').mockResolvedValue(result);

      const response = await controller.createTask(dto);

      expect(service.createTask).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe('getAllTasks', () => {
    it('should call service.getAllTasks with query params', async () => {
      const params: GetTasksParamsDTO = { status: TaskStatusEnum.PENDING };
      const result = [
        { id: 1, title: 'Test Task', status: TaskStatusEnum.PENDING },
      ];

      jest.spyOn(service, 'getAllTasks').mockResolvedValue(result);

      const response = await controller.getAllTasks(params);
      expect(service.getAllTasks).toHaveBeenCalledWith(params);
      expect(response).toEqual(result);
    });
  });

  describe('getTask', () => {
    it('should call service.getTaskById with correct id', async () => {
      const taskId = 1;
      const result = {
        id: taskId,
        title: 'Test Task',
        status: TaskStatusEnum.PENDING,
      };

      jest.spyOn(service, 'getTaskById').mockResolvedValue(result);

      const response = await controller.getTask(taskId);
      expect(service.getTaskById).toHaveBeenCalledWith(taskId);
      expect(response).toEqual(result);
    });
  });

  describe('updateTask', () => {
    it('should call service.updateTask with correct id and data', async () => {
      const taskId = 1;
      const dto: UpdateTaskRequestDTO = { title: 'Updated Task' };
      const result = { id: taskId, ...dto, status: TaskStatusEnum.PENDING };

      jest.spyOn(service, 'updateTask').mockResolvedValue(result);

      const response = await controller.updateTask(taskId, dto);
      expect(service.updateTask).toHaveBeenCalledWith(taskId, dto);
      expect(response).toEqual(result);
    });
  });

  describe('deleteTask', () => {
    it('should call service.deleteTask with correct id', async () => {
      const taskId = 1;
      const result = {
        statusCode: 200,
        message: `Task with id ${taskId} has been deleted`,
      };

      jest.spyOn(service, 'deleteTask').mockResolvedValue(result);

      const response = await controller.deleteTask(taskId);
      expect(service.deleteTask).toHaveBeenCalledWith(taskId);
      expect(response).toEqual(result);
    });
  });
});
