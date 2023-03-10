# Thunkable Backend Test

## Requirements

- Nodejs 18+
- Docker

## About

This is a service that contains only one endpoint (GET `/estimation`).

A user sends a request to this endpoint and get a response back. That response can be:

- A number between 1 and 500 if service is able to fulfill the request in under 500ms
- -1 in case this is a request that will take longer than a half a second to complete

## Teck stack

- Nodejs
  - Nestjs (Framework for building server-side applications)
  - Pg driver (collection of node.js modules for interfacing with your PostgreSQL database)
  - Knex (SQL query builder for PostgreSQL)
  - Bull (Premium Queue package for handling distributed jobs and messages in NodeJS)
- Docker, docker-compose
- Postgres
- Redis

## How it works:

- When the user sends a `GET` request to the `/estimation` endpoint the `MainController.main` method is invoked
- Then `MainService.estimate` takes place
- The `estimate` method then invoks the `EstimationService.getEstimation` method which returns back
  a number between 1 and 10000 (milliseconds)
- That number gets returned back to the controller `main` method if it is less than or equal to 500
- If that number is above 500, it means that task will take longer to process, so it will be added
  to queue (Bull + Redis) and then `-1` is returned
  - When an estimation is added to the queue its value is used as the `delay`. Bull will use that
    value as the amount of milliseconds to wait until the job can be processed.
- A job is processed in the `LongerTasksProcessor`. Processing a job means getting its data `{estimation, user_id}`
  and inserting into the database.

## How to run

1. Clone the repo

```sh
git clone https://github.com/opchaves/thunkable-services.git
cd thunkable-services
```

2. Create the .env file

```sh
cp .env.example .env
```

3. Install the dependencies

```
npm instal
```

4. Run postgres and redis with docker

```sh
docker compose up postgres redis -d
```

> Running the server within docker is also available. To run everything with
> docker instead run `docker compose up`. When running the server with
> docker compose restarting the server on changes is not available. You'd have
> to restart the server manually.

5. Run migrations

```sh
npm run migrate
```

6. Run the server

```sh
npm run start:dev
```

## Options for sending a request

- cURL
  - Open a terminal and paste `curl http://localhost:3000/estimation`
- Browser
- Postman

## Testing

The service contains only one unit test. That test checks the value returned by
the `getEstimation` method within the `Estimation` service. Run the test with:

```sh
npm run test
```

## Running the production build

- Generate the production code with: `npm run build`
- Run the production code: `npm run start:prod`
