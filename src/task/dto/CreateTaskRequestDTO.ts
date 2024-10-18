import { TaskStatusEnum } from '../enums/taskStatusEnum';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequestDTO {
  @ApiProperty({
    title: 'User ID',
    description: 'The ID of the client with this task',
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
    description: 'The description of the task',
    example: 'Finish the project by end of the week',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    title: 'Status',
    description: 'The status of the task',
    example: TaskStatusEnum.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum = TaskStatusEnum.PENDING;
}
