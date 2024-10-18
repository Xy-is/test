import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientRequestDTO {
  @ApiProperty({
    required: false,
    title: 'Name',
    description: 'The name of the client',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    title: 'Email',
    description: 'The email address of the client',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
    title: 'Phone',
    description: 'The phone number of the client',
    example: '+375290000000',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
