import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from '../../channel/schemas/channel.schema';
import { NotificationType } from '../../notification-type/schemas/notificationType.schema';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationType' })
  type: NotificationType;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channel: Channel;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
