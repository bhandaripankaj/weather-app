# Getting Started with Create React App

## clone project 

   you can run : git clone https://github.com/bhandaripankaj/weather-app.git

### install dependencies
   run : npm install 
   Note : install all dependencies package


###  use weatherapi 
 click on  https://www.weatherapi.com/signup.aspx   and signup.
 click on https://www.weatherapi.com/login.aspx for login if you have weatherapi account.

 create  .env file
click on https://www.weatherapi.com/my/ and put api key in env file  like REACT_APP_API_KEY = 12345567


### run project
run :  npm start


### deploy on github pages 
add line on package.json at top   "homepage":"https://${username}.github.io/weather-app",


run : npm install --save gh-pages

then add both line on package.json scripts object 
"predeploy": "npm run build",
"deploy": "gh-pages -d build",


run : npm run deploy

