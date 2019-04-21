# Florist
Florist is a simple SPA which implements an online flower shop with usage of React, TypeScript and Firebase.

## Local Setup
* Make sure you have git installed (https://git-scm.com/downloads).
* Run "git clone https://github.com/DmMhs/florist.git" command in terminal to copy a project.
* Check if you have Node.js installed on your machine (https://nodejs.org/en/).
* Run "npm install" to install all project dependencies. 
* Run "npm start" to run a development server
* Run "npm run storybook" to open a storybook

## Tech stack
Technologies:
* React
* Typescript
* Firebase
* Storybook

## (!) IMPORTANT
App is preconfigured for working on a localhost. Being hosted it will not be able to sign the users in with facebook and share product details on facebook.
Requirements for the real world functionality:
* register facebook app (with configured Login module);
* replace BASE_URL value (../src/config/main.ts) with a real URL of a deployed app.
