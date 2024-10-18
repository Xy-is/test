import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksParamsDTO {
  @ApiProperty({
    title: 'Status',
    description: 'The status of the tasks',
    example: TaskStatusEnum.PENDING,
  })
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum = TaskStatusEnum.PENDING;
}
