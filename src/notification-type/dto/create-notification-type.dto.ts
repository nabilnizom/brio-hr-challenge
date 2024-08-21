import { IsOptional, IsString } from 'class-validator';

export class CreateNotificationTypeDto {
  @IsString()
  code: string;

  @IsString({ each: true })
  channels: string[];

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  content: string;
}
