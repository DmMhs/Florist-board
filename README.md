# Florist
Florist is a simple SPA which implements an online flower shop with usage of React, TypeScript and Firebase.

## Local Setup
* Make sure you have git installed (https://git-scm.com/downloads).
* Run "git clone https://github.com/DmMhs/florist.git" command in terminal to copy a project.
* Check if you have Node.js installed on your machine (https://nodejs.org/en/).
* Run "npm install" to install all project dependencies. 
* Run "npm start" to run a development server

## Tech stack
Technologies:
* React
* Typescript
* Firebase

## (!) IMPORTANT
App is preconfigured for working on a localhost. Being hosted it will not be able to share product details on facebook. You still will be able to login with my facebook app, but for making share functionality to work you will need to register your own facebook app (you can find out more here: https://developers.facebook.com/).
Requirements for the real world functionality:
* replace BASE_URL value (../src/config/main.ts) with a real URL of a deployed app;
* register your own app on "facebook developers" and add login functionality to it;
* add domain of the hosted app to the "facebook developers".
