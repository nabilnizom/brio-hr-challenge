import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create-channel.dto';
import { IsIn, IsMongoId, IsString } from 'class-validator';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsIn(['email', 'ui'])
  type: 'email' | 'ui';
}
