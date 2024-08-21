# API Documentation

## Base URL

The base URL for all API endpoints is `http://localhost:3000` if config is maintained.

## Endpoints

Below are the available endpoints:

## `/channel`

### GET /channel

Retrieve a list of all users.

#### Parameters

- `type` ('email' | 'ui', required) - Type of channel
- `limit` (number) - Maximum number of results. Defaults to 20
- `skip` (number) - Number of results to skip. Defaults to 0

#### Response

- `200 OK` - Returns a JSON array of channel objects.

### POST /channel

Create a new channel.

#### Parameters

- `_id` (string) - Sets the \_id of the channel. Mostly useful for doing tests.
- `name` (string, required) - Channel name.
- `type` ('email' | 'ui', required) - Type of channel.

#### Response

- `201 Created` - Returns the created user object.
- `400 Bad Request` - If the request body is missing or invalid.

## `/notification`

### GET /notification

Retrieve a list of notifications.

#### Parameters

- `userId` (string, required) - User ID to filter notifications.
- `fromDateString` (string) - Filter notifications from a specific date (format: YYYY-MM-DD).
- `toDateString` (string) - Filter notifications up to a specific date (format: YYYY-MM-DD).
- `limit` (number) - Maximum number of results. Defaults to 20.
- `skip` (number) - Number of results to skip. Defaults to 0.

#### Response

- `200 OK` - Returns a JSON array of notification objects.

## POST /notification

Create a new notification.

#### Parameters

- `userId` (string, required) - User ID to associate the notification with.
- `companyId` (string, required) - Company ID to associate the notification with.
- `type` (string, required) - Notification type to send.

#### Response

- `201 Created` - Returns a created notification count object `{ email: number, ui: number }`.
- `400 Bad Request` - If the request body is missing or invalid.

## `/notification-type`

### GET /notification-type

Retrieve a list of notification types.

#### Parameters

- `ids` (string) - Filter notification types by IDs (comma-separated).
- `limit` (number) - Maximum number of results. Defaults to 10.
- `skip` (number) - Number of results to skip. Defaults to 0.

#### Response

- `200 OK` - Returns a JSON array of notification type objects.

## POST /notification-type

Create a new notification type.

#### Parameters

- code (string) - Code to use to refer to the type. Such as 'leave-balance-reminder'
- channels (string[]) - Assign channels to send this notification type to
- subject (string) - Set subject for email
- content (string) - Set content for notifications

#### Response

- `201 Created` - Returns the created notification type object.
- `400 Bad Request` - If the request body is missing or invalid.

## GET /notification-type/:id

Retrieve a specific notification type.

#### Parameters

- `id` (string, required) - ID of the notification type.

#### Response

- `200 OK` - Returns the notification type object.
