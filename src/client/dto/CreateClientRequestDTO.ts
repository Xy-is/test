import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientRequestDTO {
  @ApiProperty({
    title: 'Name',
    description: 'The name of the client',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Email',
    description: 'The email address of the client',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    title: 'Phone',
    description: 'The phone number of the client',
    example: '+375291234567',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('BY')
  phone: string;
}
