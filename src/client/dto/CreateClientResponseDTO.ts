import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientResponseDTO {
  @ApiProperty({
    title: 'Client ID',
    description: 'The unique identifier of the client',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    title: 'Client Name',
    description: 'The name of the client',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Client Email',
    description: 'The email of the client',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    title: 'Client Phone',
    description: 'The phone number of the client',
    example: '+375290000000',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    title: 'Creation Date',
    description: 'The date the client was created',
    example: new Date('2024-9-17T12:00:00Z'),
  })
  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @ApiProperty({
    title: 'Last Updated Date',
    description: 'The date the client was last updated',
    example: new Date('2024-10-17T12:00:00Z'),
  })
  @IsNotEmpty()
  @IsDate()
  updated_at: Date;
}
