import { IsMongoId, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  type: string;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  companyId: string;
}
