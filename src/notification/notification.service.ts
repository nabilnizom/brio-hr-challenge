import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { getCompany, getUser } from '../utils/users';
import { Notification } from './schemas/notification.schema';
import { Channel } from '../channel/schemas/channel.schema';
import { NotificationTypeService } from '../notification-type/notification-type.service';
import { NotificationType } from '../notification-type/schemas/notificationType.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel,
    private notificationTypeService: NotificationTypeService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { type, userId, companyId } = createNotificationDto;

    const notificationType: NotificationType =
      await this.notificationTypeService.findOneByCode(type);

    if (!notificationType) {
      throw new BadRequestException('Notification type not found');
    }

    const user = getUser(userId);
    const channels = this.getSubscribedChannels(
      user,
      companyId,
      notificationType,
    );

    let emailSent = 0;
    let uiSent = 0;

    if (!channels?.length) {
      return JSON.stringify({
        ok: true,
        emailSent,
        uiSent,
        message: 'No subscription found for this user',
      });
    }

    const emailChannel = channels.find((channel) => channel.type === 'email');
    const uiChannels = channels.filter((channel) => channel.type === 'ui');

    if (emailChannel) {
      this.sendEmailNotification(
        user.email,
        notificationType.subject,
        notificationType.content,
      );
      emailSent++;
    }

    await Promise.all(
      uiChannels?.map((channel) => {
        uiSent++;
        return this.sendUINotification(notificationType, user, channel);
      }),
    );

    return { emailSent, uiSent };
  }

  findMany(
    filter: {
      userId: string;
      fromDateString?: string;
      toDate?: string;
    },
    limit = 20,
    skip = 0,
  ) {
    return this.notificationModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .populate('type');
  }

  getSubscribedChannels(
    user: any,
    companyId: string,
    notificationType: NotificationType,
  ) {
    if (!user) {
      throw new BadRequestException('User not found');
    } else if (user.companyId !== companyId) {
      throw new BadRequestException('User and company mismatch');
    }

    const company = getCompany(user.companyId);

    return notificationType.channels.filter((channel) => {
      const channelId = channel._id.toString();
      return (
        company.subscribedChannels.includes(channelId) &&
        user.subscribedChannels.includes(channelId)
      );
    });
  }

  sendEmailNotification(subject: string, content: string, recipient: string) {
    console.log(
      'Sending email notification\n',
      JSON.stringify({ recipient, subject, content }, null, 2),
    );
  }

  async sendUINotification(
    notificationType: NotificationType,
    user: any,
    channel: Channel,
  ) {
    const input = {
      type: notificationType._id,
      userId: user._id,
      channel: channel._id,
      createdAt: new Date(),
    };

    const createdNotification = new this.notificationModel(input);

    return createdNotification.save();
  }
}
