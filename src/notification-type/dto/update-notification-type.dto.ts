import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationTypeDto } from './create-notification-type.dto';
import { IsMongoId, IsString } from 'class-validator';

export class UpdateNotificationTypeDto extends PartialType(
  CreateNotificationTypeDto,
) {
  @IsMongoId()
  id: string;

  @IsMongoId({ each: true })
  channels: string[];

  @IsString()
  subject?: string;

  @IsString()
  content?: string;
}
