import { Injectable } from '@nestjs/common';

import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';
import { NotificationType } from './schemas/notificationType.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotificationTypeService {
  constructor(
    @InjectModel(NotificationType.name) private notificationTypeModel,
  ) {}

  create(createNotificationTypeDto: CreateNotificationTypeDto) {
    const createdNotificationType = new this.notificationTypeModel(
      createNotificationTypeDto,
    );
    return createdNotificationType.save();
  }

  findMany(filter = {}, projection = {}, skip = 0, limit = 10) {
    return this.notificationTypeModel
      .find(filter, projection)
      .skip(skip)
      .limit(limit);
  }

  findOne(id: string) {
    return this.notificationTypeModel.findById(id);
  }

  async findOneByCode(code: string) {
    return this.notificationTypeModel.findOne({ code }).populate('channels');
  }

  update(updateNotificationTypeDto: UpdateNotificationTypeDto) {
    const { id, ...updateObj } = updateNotificationTypeDto;
    return this.notificationTypeModel.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
  }

  remove(id: string) {
    return this.notificationTypeModel.findByIdAndDelete(id);
  }
}
