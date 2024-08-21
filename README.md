# BrioHR Challenge

## by Ahmad Nabil

This project is meant to be run on Docker.
Built with:

Docker version 25.0.3
Docker Compose version v2.24.6

If you don't have these installed, refer here:
Docker - https://docs.docker.com/get-docker/
Docker compose - https://docs.docker.com/compose/install/

## Step 0

Before starting the project, make sure you are in the root directory of the project.
Run `docker -v` and `docker-compose -v` to make sure you have the correct version or newer.

## Step 1: Build Docker image

Run `docker build -t briohr-challenge`

## Step 2: Build Docker containers

There will be 2 containers ran for this project:

1. App
2. MongoDB instance

If you plan to change the mongoUri, create a .env file with MONGODB_URI variable.

Run `docker-compose up -d` to build these containers in daemon mode.

## Step 3: Run test

Run `npm run test` to run a routine test that will only pass if all the connections are ok.
Things being tested:

1. UI notification
2. Email notification
3. Both Email and UI notification
4. Get notifications

## Step 4: Manual testing

Once this is done, you can test the API endpoints using POSTMAN to localhost:3000 (if no config were changed)
