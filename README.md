# Badger Gateway API

This is the full UI and Auth setup. Currently set to run locally on port 3000, this server hides all other microservices from the client. Stores the user information, and protects routes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development env running

Install

```
npm i
```

Run Server

```
npm run server
```

Run Webpack

```
npm run watch
```

### Database Setup

Create the database and tables

```
npm run create-db
```

OPTIONAL: Seed with fake data to test

```
npm run seed-db
```

## Deployment

To be dockerized

## Built With

- [React]
- [JSONWebToken]
- [React Router]
- [Postgres]
- [Express]
- [Knex]

## Contributing

Make a feature branch, and DONT MERGE WITHOUT A REVIEW

## Authors

- **James Dempsey** - _Initial work_

## License

Yes I have my driver's license.
