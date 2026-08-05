# Write Swiftly Server

This server is being build for the Write Swiftly Writing Prompt Song Generator App. It designed as an API of Taylor Swift's music with storytags added to songs to delineate where in traditional narrative structure those songs would fit.

## Tech Stack

This server is being build using Express.js using a Postgresql database and Sequelize as an ORM.

## Getting Started

These are the steps that you would need to follow in order to get started using this server on a development environment. Currently this server is not deployed anywhere in production.

First step of course is to run a `yarn install` to get the dependencies you will need for this project.

### Setting up Database

In order to set up the database, you will first need to create a `.env` file and create the following env variables: 1. DEV_DATABASE_HOST 2. DEV_DATABASE_USERNAME 3. DEV_DATABASE_PASSWORD
you can set these how you see fit.

Next you will want to run the script command `yarn db:create`

### Migrations

Once the database is set up, you should be able to run the migrations for this project by running the command `yarn db:migrate`

### Other ENV Variables you might need

you will need to set variables PORT and TEST within your `.env` file. What you set is up to you but TEST will be what returns when you run the test endpoint on the server to ensure it is running correctly and PORT will set which localhost port you are running on.

## Roadmap

### Get basic server set up

The API will allow for an admin user to add new songs to DB with appropriate storytags assigned as well as an endpoint for fetching the song from the database which can be accessed by general public without credentials.

### Create algorithm

There are two options to the generating algorithm, one which focuses on returning three songs correlating to the beginning, middle, and end of a story, and one which returns 5 songs correlating to the three act narrative structure, including a hook, beginning plot point, midpoint, third plot point, climax, and closure. These songs will be randomly generated based on the storytags attached to them in the database, and will not repeat within the prompt. Both options will have an implementation created.

### Implement external API

There is a plan to implement Spotify's API in order to provide further details on the songs as well as album art and potentially allow for live listening and creating playlists based on the prompt.

This server is still in development and the README will be updated as further changes are made.
