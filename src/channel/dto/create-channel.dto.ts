import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsOptional()
  _id: string;

  @IsString()
  name: string;

  @IsIn(['email', 'ui'])
  type: 'email' | 'ui';
}
