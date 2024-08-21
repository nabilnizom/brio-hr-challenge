import { Module } from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';
import { NotificationTypeController } from './notification-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationType,
  NotificationTypeSchema,
} from './schemas/notificationType.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationType.name, schema: NotificationTypeSchema },
    ]),
  ],
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService],
  exports: [NotificationTypeService],
})
export class NotificationTypeModule {}
