import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findMany(
    @Query('userId') userId: string,
    @Query('fromDateString') fromDateString?: string,
    @Query('toDateString') toDateString?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    const filter = { userId };

    if (fromDateString) {
      const fromDate = new Date(fromDateString);
      filter['createdAt'] = { $gte: fromDate };
    }

    if (toDateString) {
      const toDate = new Date(toDateString);
      filter['createdAt'] = filter['createdAt']
        ? { ...filter['createdAt'], $lte: toDate }
        : { $lte: toDate };
    }

    return this.notificationService.findMany(filter, limit, skip);
  }
}
