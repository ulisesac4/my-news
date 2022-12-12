## Intro

This is a full stack example of a Newsletter. It is done in JS, Nodejs for the backend and React for the front.

This is a monolitic repo, but both parts live its own folder.

## Requirements

Must have installed NodeJS Fermium lts version to use this project.

## Setting up the dev environment

This is only a one time step. This must be done before launching for the first time the dev environment. Just run the `setupDevEnv.sh` bash file, this will install the needed software in order to make the server run.

Also make an `.env` file inside the `backend` folder. It must export the following vars:

  - *PORT=* The port in which your server will run

## Launching the dev environment

Run the `launchDevEnv.sh` bash file. This will setup the docker network. When it is ready you can edit any file in the fronend or backend and you will have hot reload.

Your frontend will be accesible in the `localhost:8765` url in your browser and the backend will be available in the specified port that you configured in the `Setting up` phase.