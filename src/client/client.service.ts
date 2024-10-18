import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetClientsParamsDTO } from './dto/GetClientsParamsDTO';
import { CreateClientRequestDTO } from './dto/CreateClientRequestDTO';
import { DatabaseService } from '../database/database.service';
import { UpdateClientRequestDTO } from './dto/UpdateClientRequestDTO';

@Injectable()
export class ClientService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createClient(body: CreateClientRequestDTO) {
    const client = await this.databaseService.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        'INSERT INTO clients(name, email, phone) VALUES ($1, $2, $3) RETURNING *;',
        [body.name, body.email, body.phone],
      );
      await client.query('COMMIT');
      return result.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');

      if (err.code === '23505') {
        throw new HttpException(
          'Client with this email or phone already exists',
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  async getAllClients(params: GetClientsParamsDTO) {
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 10;

    const limit = perPage;
    const offset = perPage * (page - 1);

    try {
      return (
        await this.databaseService.query(
          'SELECT * FROM clients LIMIT $1 OFFSET $2;',
          [limit, offset],
        )
      ).rows;
    } catch (err) {
      throw new HttpException(
        `Failed to fetch clients: ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getClientById(clientId: number) {
    const client = await this.databaseService.query(
      'SELECT * FROM clients WHERE id = $1;',
      [clientId],
    );

    const result = client.rows;

    if (result.length === 0) {
      throw new HttpException(
        `Client with id ${clientId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result[0];
  }

  async updateClient(
    updateClientData: UpdateClientRequestDTO,
    clientId: number,
  ) {
    const client = await this.databaseService.pool.connect();
    try {
      await client.query('BEGIN');
      const fields = [];
      const values = [];
      if (updateClientData.name) {
        fields.push(`name = $${fields.length + 1}`);
        values.push(updateClientData.name);
      }
      if (updateClientData.email) {
        fields.push(`email = $${fields.length + 1}`);
        values.push(updateClientData.email);
      }
      if (updateClientData.phone) {
        fields.push(`phone = $${fields.length + 1}`);
        values.push(updateClientData.phone);
      }
      if (fields.length === 0) {
        throw new HttpException(
          'No fields provided for update',
          HttpStatus.BAD_REQUEST,
        );
      }
      values.push(clientId);
      const query = `UPDATE clients SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *;`;
      const result = await client.query(query, values);
      if (result.rowCount === 0) {
        throw new HttpException(
          `Client with id ${clientId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      await client.query('COMMIT');
      return result.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        `User with this email address or phone is already exists`,
        HttpStatus.CONFLICT,
      );
    } finally {
      client.release();
    }
  }

  async deleteClientById(clientId: number) {
    const result = await this.databaseService.query(
      'DELETE FROM clients WHERE id = $1',
      [clientId],
    );

    if (result.rowCount === 0) {
      throw new HttpException(
        `There are no clients with this id: ${clientId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { message: `Client with id ${clientId} has been deleted` };
  }
}
