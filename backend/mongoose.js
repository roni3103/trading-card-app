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

// var getAllCards = function(){
//     var cardSchema = mongoose.Schema({
//         Name: String,
//         Collection: String,
//         Edition: String,
//         Colour: String
//     });
//     // var Card = mongoose.model('Card', cardSchema);
//     // var results=[];

//     var MyCard = mongoose.model('Card', cardSchema)
//     MyCard.find({},(function(err, results){
//         if(err){
//             console.log('Problem is', err)
//         } else {
//             console.log('results are', results)
//     }
//     res.send(200, {data: results})
//   }));


//     // Card.find({}, function(err, collection){
//     //     // A little bit of stuff to seed db for testing if there's nothing in it
//     //     // if(collection.length === 0){
//     //     //     Card.create({Name: 'Roni', Collection: 'Graveyard', Edition:'ronitest', Colour: 'Black'});
//     //     // }
//     //     if(err){
//     //         console.log('problem is', err)
//     //     }
//     //     for(item in collection){
//     //         results.push(collection[item])
//     //     }
//     // }).then(function(results){
//     //     console.log('results once all in', results)
        
//     // })
//     // return results
    

    
// };

module.exports = {
    connectToDB: connectToDB,
    // getAllCards: getAllCards
}


