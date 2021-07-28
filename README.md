
# Wonder Wander Public Art App
This version uses Javascript, React, Redux, Node.js, Express.js, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Description

_Duration: 3 Weeks_

This project, Wonder Wander Publis Art App, is a client requested project that encourages the public to explore community art and to engage with it through See. Say. Do. educational prompts. It is a responsive web application built to offer a phone view for mobile users and a desktop view for administators. Anyone can use this app without login in, however, user's who do register and/or login are able to track their artviewing progress. Wonder Wander allows the user to locate public art with an integrated Google Map API that shows the user art that is near them. There is also a list view of all art that indicates the distance an art piece is from the user's current location. There is an art detail screen that shows an image of the artwork it's name, the artist who created it, and any sponosor's or collections that the artwork is supported by. When looking at a specific art piece, the user is able to engage in educational acitivites based on See. Say. and Do. prompts. This app has an integrated email system that allows user's to sign up for a Weekly Wander Newsletter, or to contact Wonder Wander to add a collection to the app, become a sponosr, or to connect with the agency. Wonder Wander has multiple email intergrated systems that allow the user to sign up for an email listing or to become a sponsor of a collection. One challenge the building of this app addressed was to streamline administrative usability in collecting all of the details for and the curating of the artworks featured in the app. An administrator must be logged in to view the admin pages of the app where they have the ability to add, edit, publish, or delete individual pieces of art, artists, collections, sponsors, other art adventures, and quotes. The building of the app was an absolutely wonderful experience. 

This application was created in a three week sprint. The timeline of our project was:

- Week One: Client meeting, project scoping, creating Figma wireframes and a completed scope document describing the app functionality with sign off from the client.

- Week Two: Project launch, creating a database in PostgreSQL, building out all base components and functionality for the app. 

- Week Three: Wrapping up building base components and functionality, testing and bug fixes, creating presentation for the application, documentation and client hand off. 


To see the fully functional site, please visit: 

https://calm-lowlands-28823.herokuapp.com/#/welcome1 

## App Demo
![Show WonderWander App](Pictures/WonderWander.gif)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a PostgreSQL database named `wonder_db`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that downloaded. We recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run an `npm install`
4. HERE GOES FOR INSTALL ISSUES (MAILCHIMP) (IAN) (NOTE: Add in command for legacy peer deps)
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you.
8. Create a .env file at the root of the project and paste this line into the file: SERVER_SESSION_SECRET=superDuperSecret
While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.
Start postgres if not running already by using brew services start postgresql
9. Inside your .env file put in any api key such as Google Maps Api, (IAN FOR MAIL CHIMP, AWS)

## Usage
1. The user arrives at the welcome page which includes a quote of the day with the option to read through the welcome tutorial or to skip to the home page. There is also an option to sign up at the end of the welcome tutorial.
2. Once the user arrives at the home page they will see an artwork of the day, a list of public art collections, the option to sign up for the Weekly Wander Newsletter and a list of other art adventures. If the user is signed in, they will not see the prompt to sign up for a news letter. 
3. There is a menu bar where the user can see a list of options such as a Map/List view of artwork, ability to contact Wonder Wander, request to be a sponsor, or add an art collection. If the user is an administrator who is signed into the app, they will see an admin link in the menu bar that will route them to the adminisration pages. 
4. In the Map/List view the user will see a google map that shows all the artwork near the current location of the user. There is also a list view that shows all the artwork in the app including the distance that each piece is from the user's current location. The user can click on a balloon in the map or on a listed artwork to view that specific piece of art.
5. After clicking on a balloon or artwork list item, the user is routed to an artwork detail page which shows an image of the work, it's name, year created, and a description of the piece. This view also hosts a link the the artist, sponosor of, and collection that the piece is in, if any. The user can click on a link to get directions from their location to the artwork. They also have the option to click on See. Say. Do. educational prompts that are listed on this page and unique to the artwork. 
6. The See. Say. and Do. prompts provide a the opportunity for users to learn more about each artwork (See), vote on various elements of how they feel about it (Say), and engage in additional actions inspired by it (Do).
7. From the artwork detail page, if the user clicks on the artist link they are routed to an artist detail page which contains information about the artist including an image of them, their name, a biography, and additional works of art they have created, along with a link to their website. 
8. From the artwork detail page, if the user clicks on the sponsor link they are routed to a sponosor detail page that contains information about the sponsor including their logo, name, a description of them, a map view with balloons to indicate works of art they sponsor, a list of artwork they sponsor, and a link to their website. 
9. From the artwork detail page, if the user clicks on the collection link they are routed to a collection detail page which contains information about the collection including an image, it's name, a description, a map view with balloons to indicate works of art in the collection, a list of artwork in the collection, a link to their website, and a donation link.
10. The other Art Adventures, located on the home screen are activities meant to inspire a sence of awe and wonder. They are activities that encourage the user to get out and explore their environment. The other art adventures also include See. and Do. prompts to engage the user in their process.
11. The About page highlights the founder of Wonder Wander, Shannon Steven, and includes her name, an image of her, a biography and mission statement, and the ability to contact Wonder Wander to sponsor art, add a collection, or to connect for future learning opportunities. 
12. The Administration pages are accessible to registered administrators who are signed into the application. Once they are signed in an admin link renders in the menu bar. Clicking on the link routes the administrator to teh admin landing page which offers a brief tutorial of how to use the admin pages. There is also a button to create new admin users on the landing page. 
12. A logged in administrator can view a list of all artwork, artists, sponsors, collections, art adventures, and quotes. They can also add, edit and delete artworks, artists, sponsors, collections, art adventures, and quotes. There is also a publish feature for each item that allows the administrator to set it to published (which makes it veiwable on the public facing pages of the app) or unpublished (which hides it from the In the admin side the user can create, edit and delete new collections, art pieces, new sponsors, quotes, and other art adventures.

## Installation -- AWS Setup Instructions 
1. First, go to https://console.aws.amazon.com and follow the steps to create an account, a root account 
2. Then go to https://console.aws.amazon.com/s3 to setup the bucket for s3  uploader specifically 
3. Go to buckets and click on create bucket 
4. The bucket name NEEDS to be wonder-wander-bucket for the uploader to work
5. When creating a bucket, for the region, it really doesn't matter what region just pick the one closest. Write down what region you picked because you will     need the region code later. For example, I chose the us east ohio region and the region code was us-east-2
6. Click next after the region
7. MAKE SURE TO CLICK OFF BLOCK ALL PUBLIC ACCESS
There is a checkbox that is defaulted to checked and leaving it checked will prevent the app from accessing the bucket 
8. At review, click create bucket to continue 
9. Once the bucket is created, we need to edit the permissions and the CORS configuration 
10. Click on the bucket and then click on permissions, and then click on CORS configuration for that bucket 
I included the code block below, just copy-paste it into the editor window:
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
Save the configuration
11. Go to https://console.aws.amazon.com/iam and click on groups to first create a group 
12. Click create new group and give it a name, click next step
13. At this next step, find and check the AmazonS3FullAccess policy, then click next step
14. Then click create group 
15. Now click on the user tab the add a user
16. Give the new user a name, make sure to check programmatic access
17. Skip adding any tags and then create new user
18. You are brought to a screen with an access key ID and a secret access key, you will need BOTH
19. Copy the access key id to the AWS_ACCESS_KEY_ID line of the .env file in the source code 
20. Click show to see the secret access key and the copy it to the AWS_SECRET_ACCESS_KEY line of the .env file in the source code 
21. Save the .env file 
22. After doing that, go the policies tab and click create policy 
23. For services, find and click on S3, check all S3 actions
24. Under the resources section, check any for all the options, then click review policy 
25. Give policy name, and then click create policy 
At this point, the app is now set to work with the created bucket 


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
