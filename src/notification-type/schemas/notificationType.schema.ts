import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from '../../channel/schemas/channel.schema';

export type NotificationTypeDocument = HydratedDocument<NotificationType>;

@Schema()
export class NotificationType {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
    required: true,
  })
  channels: Channel[];

  @Prop()
  subject: string;

  @Prop()
  content: string;
}

export const NotificationTypeSchema =
  SchemaFactory.createForClass(NotificationType);
