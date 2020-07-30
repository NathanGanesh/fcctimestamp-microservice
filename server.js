// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestap", (req,res) => {
  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().getTime().toUTCString();
  
  res.json({date: responseObject});

})

//`GET [project_url]/api/timestamp/:date_string?`
let responseObject = {}
app.get("/api/timestap/:date", (req,res) =>{
  let input = req.params.date;

  if(input.includes("-")){
    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();
  }
  else{
    input = parseInt(input);
    
    responseObject['unix'] = new Date(input).getTime();
  }
  if(responseObject['unix'] ==NaN ||  responseObject['utc'] == 'Invalid Date'){
      res.json({error: 'Invalid Date String'});
  }

  
  res.json(responseObject)
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});