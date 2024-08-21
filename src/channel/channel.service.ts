import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Channel } from './schemas/channel.schema';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(@InjectModel(Channel.name) private channelModel) {}

  create(createChannelDto: CreateChannelDto) {
    const createdChannel = new this.channelModel(createChannelDto);
    return createdChannel.save();
  }

  findMany(filter = {}, projection = {}, skip = 0, limit = 10) {
    return this.channelModel.find(filter, projection).skip(skip).limit(limit);
  }

  findOne(id: string) {
    return this.channelModel.findById(id);
  }

  update(updateChannelDto: UpdateChannelDto) {
    const { id, ...updateObj } = updateChannelDto;
    return this.channelModel.findByIdAndUpdate(id, updateObj, { new: true });
  }

  remove(id: string) {
    return this.channelModel.findByIdAndDelete(id);
  }
}
