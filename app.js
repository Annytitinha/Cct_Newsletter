//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
const path = require('path');

const app = express();

// Bodyparser Middleware
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//app.get("/", function(req, res){
    //res.sendFile(__dirname + "/signup.html");
//});

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect('/fail.html');
    return;
  }

//app.post ("/", function(req, res){

  //  var firtName = req.body.fName;
    //var lastName = req.body.lName;
    //var email = req.body.email;

    // data object js
     // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  //tunring it into flagpack json, passing data into a string Json format
  const postData = JSON.stringify(data);

  const options = {
    url: 'us8.api.mailchimp.com/3.0/lists/fd5e2741f8',
    method: 'POST',
    headers: {
      Authorization: 'auth anaiana:ead193d671e84a5aaea6eb44ec76dc0d-us8'
    },
    body: postData
  };

    
   
    // cnheck the date that we get send back
  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/fail.html');
    } else {
      if (response.statusCode === 200) {
        res.redirect('/success.html');
      } else {
        res.redirect('/fail.html');
      }
    }
  });
});
// passing the data to the mailchimp server
 // request.write(jsonData);
 // request.end();
  //}

//});

//app.post ("/failure", function(req, res){
  //res.redirect ("/")
//})

app.listen(process.env.PORT|| 3000, function() {
     console.log("Server is running on port 3000");

});


//API KEY
//ead193d671e84a5aaea6eb44ec76dc0d-us8

//list Id

//fd5e2741f8
