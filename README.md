
# Wonder Wander
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).
## Description
_Duration: 3 Weeks_
This project, Wonder Wander, is a client requested project about exploring and learning art. It is a responsive web application built for Phone view. 
This application was created in a three week sprint.
The timeline of our project was:
- One week for developing a Scope document along with wireframes that were developed in Figma and Creating a Database with postgresql.
- Two weeks for developing the Wonder Wander application.
Wonder Wander allows the user to view different pieces of art that are in collections. There is a intergrated Google map view that lets the user view what art pieces are near them based on distance. The google maps can also filter art by what collection you are currently in. When looking at a specific art piece, the user will be able to do acitivites based on See. Say. and Do. Wonder Wander also allows the user to sign up or login if already an exsisting user. Logging in you are able to check on an icon to mark if the artwork has been already seen or not. Wonder Wander has multiple email intergrated systems that allow the user to sign up for an email listing or to become a sponsor of a collection. There is an admin side where the administrator can add, edit, delete or publish collections, art pieces, sponsors, and artists.  
The problem we were trying to solve with this application was to highlight artwork with educational content, Track users viewing progress, Create art collections, and Streamline admin usability.
How we solved these problems was to set up user initial experience, Create distinct features for registered users, and simplify and streamline admin actions.
To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)
## Screen Shot
SCREEN SHOTS HERE
## Prerequisites
Before you get started, make sure you have the following software installed on your computer:
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
## Installation
1. Create a database named `wonder_db`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. HERE GOES FOR INSTALL ISSUES (MAILCHIMP) (IAN) (NOTE: Add in command for legacy peer deps)
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!
8. Create a .env file at the root of the project and paste this line into the file:
SERVER_SESSION_SECRET=superDuperSecret
While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.
Start postgres if not running already by using brew services start postgresql
9. Inside your .env file put in any api key such as Google Maps Api, (IAN FOR MAIL CHIMP, AWS)
## Usage
1. The user will come to the welcome pages and read through what Wonder Wander is all about. There will be an option to sign up at the end of the welcome pages
2. When the user is done with the welcome pages, the user will be sent to the Home page. This is where the users will be able to see art of the day, different collections, other adventures, and be able to sign up for a news letter. If signed in, the user will not see the prompt to be able to sign up for a news letter. 
3. There is a menu bar where the user will be able to see a list of different options such as a Map/List view of artwork, ability to contact Wonder Wander, request to be a sponsor, or add an art collection. When on the admin side the user will see the admin button to take them to the admin view. 
4. In the Map/List view the user will see a google intergrated map that shows all the artwork and where the current location of the user is in relation to all the artworks. There is a list view that shows all the art along with the distance from the user. The user can click on a specific art piece to view.
5. When inside the art, it will show the detail of the art along with a description, options to take the user to Artist detail, Collection, Sponsor of that art, and Directions to the art piece. 
6. Below that will be a See, Say, and Do options which is the educational part of the app. The See gives more information on the art piece, Say askes you to vote on how you feel about the art piece, and the Do will prompt the user to take a picture along with some instructions.
7. In the sponsor and collection pages, there will be a map similar to the map/list view where the user can see what art is either in that collection or is sponsored by. These pages will have links to either donate or to view the website of these collections/sponsors.
8. Other Art adventures is an activity that encourages the user to get out and explore certain places. There will be a See and Do option on these pages.
9. The Admin side after logging in as an admin and clicking on the admin link in the menu will take the user to the admin landing page.
10. In the admin side the user can create, edit and delete new collections, art pieces, new sponsors, quotes, and other art adventures.
## Built With
- Redux
- React
- Router-Dom
- Redux Saga
- Material UI
- Bycrypt
- Express
- Node.JS
- Google Maps
- Mail Chimp
- AWS S3
- React Video Player
## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)
## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)


# EDA Project
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
