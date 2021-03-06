const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
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

// Signup Route... END POINT SIGNUP
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // validation...Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect('/failure.html');
    return;
  }

//app.post ("/", function(req, res){

  //  var firtName = req.body.fName;
    //var lastName = req.body.lName;
    //var email = req.body.email;

    // data object js
     // Construct req data acordinly to mailchimp
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
    url: 'https//us8.api.mailchimp.com/3.0/lists/fd5e2741f8',
    method: 'POST',
    headers: {
      Authorization: 'auth ead193d671e84a5aaea6eb44ec76dc0d-us8'
    },
    body: postData
  };

    
   
    // cnheck the date that we get send back
  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/failure.html');
    } else {
      if (response.statusCode === 200) {
        res.redirect('/successful.html');
      } else {
        res.redirect('/failure.html');
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
