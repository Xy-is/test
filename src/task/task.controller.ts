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
import { TaskService } from './task.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequestDTO } from './dto/CreateTaskRequestDTO';
import { GetTasksParamsDTO } from './dto/GetTasksPatamsDTO';
import { UpdateTaskRequestDTO } from './dto/UpdateTaskRequestDTO';
import { CreateTaskResponseDTO } from './dto/CreateTaskResponseDTO';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('task')
@ApiTags('task')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  example: {
    message: ['some field is incorrect'],
    error: 'Bad Request',
    statusCode: 400,
  },
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The task has been successfully created.',
    type: CreateTaskResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user for whom the task is being created does not exist.',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Failed to create task: User not found',
    },
  })
  async createTask(@Body() body: CreateTaskRequestDTO) {
    return await this.taskService.createTask(body);
  }

  @Get('')
  @ApiOperation({ summary: 'Get All Tasks' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The task has been successfully created.',
    type: CreateTaskResponseDTO,
  })
  async getAllTasks(@Query() params: GetTasksParamsDTO) {
    return await this.taskService.getAllTasks(params);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateTaskResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Task with id 1 not found',
    },
  })
  async getTask(@Param('id', new ParseIntPipe()) taskId: number) {
    return await this.taskService.getTaskById(taskId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update task by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task has been successfully updated.',
    type: CreateTaskResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The task with the specified ID was not found.',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Task with id 1 not found',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No fields provided for update.',
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'No fields provided for update',
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An unexpected error occurred while updating the task.',
    example: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to update task: Internal Server Error',
    },
  })
  async updateTask(
    @Param('id', new ParseIntPipe()) taskId: number,
    @Body() body: UpdateTaskRequestDTO,
  ) {
    return await this.taskService.updateTask(taskId, body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task has been successfully deleted.',
    example: {
      statusCode: HttpStatus.OK,
      message: 'Task with id 1 has been deleted',
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The task with the specified ID was not found.',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There are no tasks with this id: 1',
    },
  })
  async deleteTask(@Param('id', new ParseIntPipe()) taskId: number) {
    return await this.taskService.deleteTask(taskId);
  }
}
