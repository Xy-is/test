import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskRequestDTO {
  @ApiProperty({
    title: 'User ID',
    description: 'The ID of the user with this task',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiProperty({
    title: 'Title',
    description: 'The title of the task',
    example: 'Complete project',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    title: 'Description',
    description: 'The description of the task',
    example: 'Finish the project by end of the week',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    title: 'Status',
    description: 'The status of the task',
    enum: TaskStatusEnum,
    example: TaskStatusEnum.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;
}
