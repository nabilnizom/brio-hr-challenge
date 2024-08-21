import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import * as MOCK_USERS from './fixtures/users.json';
import * as MOCK_CHANNELS from './fixtures/channels.json';
import * as MOCK_NOTIFICATION_TYPES from './fixtures/notification-types.json';

import { NotificationService } from './notification.service';
import { NotificationTypeService } from '../notification-type/notification-type.service';

import { ChannelSchema } from '../channel/schemas/channel.schema';
import { Notification } from './schemas/notification.schema';
import {
  NotificationType,
  NotificationTypeSchema,
} from '../notification-type/schemas/notificationType.schema';
import { Mongoose } from 'mongoose';
import { INestApplication } from '@nestjs/common';

describe('NotificationService', () => {
  let app: INestApplication;
  let notificationService: NotificationService;
  let notificationTypeService: NotificationTypeService;
  let mongoose: Mongoose = new Mongoose();

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    mongoose = await mongoose.connect(mongoServer.getUri());

    // Load fixtures
    await Promise.all([
      ...MOCK_NOTIFICATION_TYPES.map(
        async (notificationType) =>
          await mongoose
            .model('notificationType', NotificationTypeSchema)
            .create(notificationType),
      ),

      ...MOCK_CHANNELS.map(async (channel) => {
        if (channel.type !== 'email' && channel.type !== 'ui') {
          throw new Error('Invalid channel type in fixture');
        }

        return mongoose.model('channel', ChannelSchema).create(channel);
      }),
    ]);

    // Initialize services
    notificationTypeService = new NotificationTypeService(
      NotificationType.name,
    );
    notificationService = new NotificationService(
      Notification.name,
      notificationTypeService,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NotificationService,
          useValue: notificationService,
        },
        {
          provide: NotificationTypeService,
          useValue: notificationTypeService,
        },
      ],
    }).compile();

    // Initialize app
    app = module.createNestApplication();
    console.log('Initializing app');
    await app.init();
  }, 60000);

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('UI notification', async () => {
    const results = { email: 0, ui: 0 };

    for (const user of MOCK_USERS) {
      const res = await fetch('http://localhost:3000/notification', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          companyId: user.companyId,
          type: 'leave-balance-reminder',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to send notification');
      }

      const data = await res.json();

      results.email += data.emailSent;
      results.ui += data.uiSent;
    }

    expect(results.email).toBe(0);
    expect(results.ui).toBe(3);
  });

  it('Email notification', async () => {
    const results = { email: 0, ui: 0 };

    for (const user of MOCK_USERS) {
      const res = await fetch('http://localhost:3000/notification', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          companyId: user.companyId,
          type: 'monthly-payslip',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to send notification');
      }

      const data = await res.json();

      results.email += data.emailSent;
      results.ui += data.uiSent;
    }

    expect(results.email).toBe(3);
    expect(results.ui).toBe(0);
  });

  it('Both email and UI notification', async () => {
    const results = { email: 0, ui: 0 };

    for (const user of MOCK_USERS) {
      const res = await fetch('http://localhost:3000/notification', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          companyId: user.companyId,
          type: 'happy-birthday',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to send notification');
      }

      const data = await res.json();

      results.email += data.emailSent;
      results.ui += data.uiSent;
    }

    expect(results.email).toBe(3);
    expect(results.ui).toBe(3);
  });

  it('Get notifications', async () => {
    const res = await fetch(
      'http://localhost:3000/notification?userId=a00000000000000000000001',
      {
        method: 'GET',
      },
    );

    if (!res.ok) {
      throw new Error('Failed to get notifications');
    }

    const data = await res.json();

    expect(data.length).toBe(2);
  });
});
