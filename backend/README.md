# js-app-template-backend
A template for nodejs/express webapps

## Backend

The backend is a simple NodeJS express application. 

By default, the backend supports running different environment configuration
using the env.js file and a parameter to server.js

## Building

    npm install

## Running

Running the backend can be accomplished by running the npm script for it

    npm run start-dev

Starts the server on the port configured in env.json. By default, port 3000

Running production:

    npm run start-prod

Again, with the settings configured in env.json

## Testing

Recommended: 

    npm install -g mocha

Running the tests

    npm run test

Alternatively, use Mocha natively to run the tests

    mocha --recursive ./test


### Test coverage

Setup with Istanbul to provide test coverage

    npm run coverage
