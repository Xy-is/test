import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnum';

export class CreateTaskResponseDTO {
  @ApiProperty({
    title: 'ID',
    description: 'The unique identifier of the task',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    title: 'User ID',
    description: 'The ID of the user who created the task',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({
    title: 'Title',
    description: 'The title of the task',
    example: 'Complete project',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    title: 'Description',
    description: 'A detailed description of the task',
    example: 'Finish the project by end of the week',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    title: 'Status',
    description: 'The current status of the task',
    example: TaskStatusEnum.PENDING,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @ApiProperty({
    title: 'Updated At',
    description: 'The date and time when the task was last updated',
    example: '2023-12-06T12:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  @ApiProperty({
    title: 'Created At',
    description: 'The date and time when the task was created',
    example: '2023-12-06T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  created_at: Date;
}
