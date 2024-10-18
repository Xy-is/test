import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskRequestDTO } from './dto/CreateTaskRequestDTO';
import { GetTasksParamsDTO } from './dto/GetTasksPatamsDTO';
import { UpdateTaskRequestDTO } from './dto/UpdateTaskRequestDTO';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createTask(body: CreateTaskRequestDTO) {
    const task = await this.databaseService.pool.connect();
    try {
      await task.query('BEGIN');
      const result = await task.query(
        'INSERT INTO tasks(user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *;',
        [body.user_id, body.title, body.description, body.status],
      );
      await task.query('COMMIT');
      return result.rows[0];
    } catch (err) {
      await task.query('ROLLBACK');

      if (err.code === '23505') {
        throw new HttpException(
          'The user for whom the task is being created does not exist.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      task.release();
    }
  }

  async getAllTasks(params: GetTasksParamsDTO) {
    const { status } = params;
    const query = status
      ? 'SELECT * FROM tasks WHERE status = $1;'
      : 'SELECT * FROM tasks;';
    const values = status ? [status] : [];

    const result = await this.databaseService.query(query, values);
    return result.rows;
  }

  async getTaskById(taskId: number) {
    const task = await this.databaseService.query(
      'SELECT * FROM tasks WHERE id = $1;',
      [taskId],
    );

    const result = task.rows;

    if (result.length === 0) {
      throw new HttpException(
        `Task with id ${taskId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result[0];
  }

  async updateTask(taskId: number, updateTaskData: UpdateTaskRequestDTO) {
    const task = await this.databaseService.pool.connect();
    try {
      await task.query('BEGIN');

      const fields = [];
      const values = [];

      if (updateTaskData.user_id) {
        fields.push(`user_id = $${fields.length + 1}`);
        values.push(updateTaskData.user_id);
      }
      if (updateTaskData.title) {
        fields.push(`title = $${fields.length + 1}`);
        values.push(updateTaskData.title);
      }
      if (updateTaskData.description) {
        fields.push(`description = $${fields.length + 1}`);
        values.push(updateTaskData.description);
      }
      if (updateTaskData.status) {
        fields.push(`status = $${fields.length + 1}`);
        values.push(updateTaskData.status);
      }

      if (fields.length === 0) {
        throw new HttpException(
          'No fields provided for update',
          HttpStatus.BAD_REQUEST,
        );
      }

      values.push(taskId);

      const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${
        values.length
      } RETURNING *;`;

      const result = await task.query(query, values);

      if (result.rowCount === 0) {
        throw new HttpException(
          `Task with id ${taskId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      await task.query('COMMIT');
      return result.rows[0];
    } catch (err) {
      await task.query('ROLLBACK');
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        `Failed to update task: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      task.release();
    }
  }

  async deleteTask(taskId: number) {
    const result = await this.databaseService.query(
      'DELETE FROM tasks WHERE id = $1',
      [taskId],
    );

    // Проверяем, была ли удалена запись
    if (result.rowCount === 0) {
      throw new HttpException(
        `There are no tasks with this id: ${taskId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { message: `Task with id ${taskId} has been deleted` };
  }
}
