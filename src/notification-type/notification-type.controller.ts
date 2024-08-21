import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';

@Controller('notification-type')
export class NotificationTypeController {
  constructor(
    private readonly notificationTypeService: NotificationTypeService,
  ) {}

  @Post()
  create(@Body() createNotificationTypeDto: CreateNotificationTypeDto) {
    return this.notificationTypeService.create(createNotificationTypeDto);
  }

  @Get()
  findMany(
    @Query('ids') ids?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    const filter = {};

    if (ids) {
      filter['_id'] = { $in: ids.split(',') };
    }

    return this.notificationTypeService.findMany(filter, {}, skip, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationTypeService.findOne(id);
  }

  @Patch()
  update(@Body() updateNotificationTypeDto: UpdateNotificationTypeDto) {
    return this.notificationTypeService.update(updateNotificationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTypeService.remove(id);
  }
}
