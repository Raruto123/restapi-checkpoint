const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    age : {
        type : Number
    },
    description : {
        type : String
    }
});

module.exports = mongoose.model("Users", userSchema);

const User = mongoose.model("Users", userSchema);

const newUser = new User({
    name : "John Dee",
    age : 21,
    description : "Loves Video-Game"
});

// newUser.save()
// .then(function() {
//     console.log("document crée avec succès");
// }).catch(function(error) {
//     console.log("document n'a pas pu se crée : ", {error})
// })