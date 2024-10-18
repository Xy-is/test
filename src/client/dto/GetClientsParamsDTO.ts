import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetClientsParamsDTO {
  @ApiProperty({
    required: false,
    title: 'Page',
    description: 'The page number of clients',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    required: false,
    title: 'Per Page',
    description: 'The number of clients per page',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  perPage?: number = 10;
}
