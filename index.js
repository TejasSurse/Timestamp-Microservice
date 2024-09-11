// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  // Get the 'date' parameter from the request URL, if provided (optional parameter)
  let date = req.params.date;
  let unixDate;
  let dateObj;
  let utcDate;

  // Check if the provided date string is in Unix format (i.e., contains only digits)
  let isUnix = /^\d+$/.test(date);

  // If no date is provided, create a new Date object representing the current date/time
  if(!date){
    dateObj = new Date();
  }
  // If a date is provided and it's in Unix format, convert it to an integer and create a new Date object using the Unix timestamp
  else if(date && isUnix){
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);
  }
  // If a date is provided and it's not in Unix format, try to create a new Date object from the provided date string
  else if(date && !isUnix){
    dateObj = new Date(date);
  }

  // If the date object is invalid, return an error message in the response
  if(dateObj.toString() === "Invalid Date"){
    res.json({error : "Invalid Date"});
    return;
  }

  // Get the Unix timestamp and UTC string from the valid Date object
  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString();

  // Return the Unix timestamp and UTC string as a JSON response
  res.json({unix : unixDate, utc : utcDate});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
