// app/models/message.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Message', {
    text : {type : String, default: ''},
    username : {type : String, default: ''},
    created: {type: Date, default: Date.now}
});