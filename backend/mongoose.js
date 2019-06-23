const mongoose = require('mongoose');

var connectToDB = function (config) {
    mongoose.connect(config.dbUrl)

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
    console.log('Magic db opened');
    });
    return db;   
};

module.exports = {
    connectToDB: connectToDB
}


