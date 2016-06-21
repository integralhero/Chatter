// app/routes.js
var http = require('http');
var https = require('https');
var querystring = require('querystring');
// grab the model
var Message = require('./models/Message');

module.exports = function(app) {

    // GET all messages
    app.get('/api/messages', function(req, res) {
        // use mongoose to get all messages in the database
        Message.find(function(err, messages) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            console.log("Find results: ", messages);
            if (err)
                res.send(err);

            res.json(messages); // return all messages in JSON format
        });
    });

    //POST save new message
    app.post('/api/messages', function(req, res) {
        console.log("Request: ", req.body);
        console.log("Response: ", res.body);
        var newmsg = new Message(req.body);
        console.log("New message: ", newmsg);

        newmsg.save(function (err) {
            if(err) {
                console.log(err);
            }
            else {
                console.log("saved newmsg");                
            }
        })
        
    });
    app.post("/auth", function(req, res) {
        console.log("REQ BODY: ", req.body);
        if(req.body.googleToken) {
            console.log("asdfllknlasndlkfnlknaklsdlfnklanksdnlflkanklsndlkfnlkanlskdlkfnlkanlksdnlkfnlaknslkdnflknalknsdlkfnlk");
            var googleToken = req.body.googleToken;
            console.log("Google Token request from: ", googleToken);

            var post_data = querystring.stringify({
                id_token: googleToken
            });
            console.log("Post data; ", post_data);

            var post_options = {
                host: 'www.googleapis.com',
                path: '/oauth2/v3/tokeninfo',
                method: 'POST',
                headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                     }
            };

            // Set up the request
            var post_req = https.request(post_options, function(resp) {
                resp.setEncoding('utf8');

                resp.on('data', function (chunk) {
                    //console.log("response from google: ", resp, " data: ", chunk);
                    res.send(chunk);
                });
            });

            post_req.write(post_data);
            post_req.end();

        }
        else if(req.query.code) {
            res.send("linkedin token received");
        }   
        else {
            res.send("no token received");
        }
    });
    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        console.log("Accessed index routes");
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
