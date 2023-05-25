const { default: mongoose } = require("mongoose");
const express = require("express");
const Users = require("./models/User");
// const { Router } = require("express");
const router = express.Router();

mongoose.connect("mongodb+srv://proplayer54:raruto123@checkpoint.jpr4unp.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(function() {
    const app = express();
    app.use(express.json());
    app.use("/api", router)
    app.listen(3000, function() {
        console.log("le serveur fonctionne");
    })
});


router.get("/users", async (req, res) => {
    const users = await Users.find({});
    res.send(users);
});

router.post("/users", async (req, res) => {
    const newUser = new Users({
        name : req.body.name,
        age : req.body.age,
        description : req.body.description
    });
    await newUser.save().then(function(){
        console.log("nouveau document crée")
    });
    res.send(newUser)
});

router.put("/users/:id", async (req, res) => {
try {
    const {id} = req.params
    const user = await Users.findByIdAndUpdate(id, {
        name : req.body.name,
        age : req.body.age,
        description : req.body.description
    });
    if (!user) {
        // user.name = req.body.name
        return res.status(404).json(`pas d'utilisateur avec l'id  ${user}`)
    }

    res.status(200).send("modification effectuée avec succès")

    // if (req.body.age) {
    //     user.age = req.body.age
    // }
    // if (req.body.description) {
    //     user.description = req.body.description
    // }
    // await user.save().then(function(){
    //     console.log("nouveau document modifié")
    // });
    // res.send(user)
} catch(error){
    res.status(500).json({msg : error.message})
    // const user = await Users.findByIdAndUpdate(id)
    // const {id} = req.params
    // res.send(`${id}`)
    // return res.status(404).json(`${user}`)

};
});

router.delete("/users/:id", async (req, res) => {
try{
    const {id} = req.params
    const user = await Users.findByIdAndRemove(id)
    res.status(200).send(user)
}catch{
    res.status(404).send({error : "User doesn't exist"})
}});


module.exports = router;