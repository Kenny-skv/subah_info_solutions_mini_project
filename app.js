const express = require("express")
const mongoose = require("mongoose")
const DB_URL = "mongodb+srv://kennethamoah77:kenneth2345@cluster0.9gjrfuc.mongodb.net/?retryWrites=true&w=majority"
const User = require('./models/studentModel');
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 2000

app.use(bodyParser.json());

//Get user data from database
app.get('/user', async (req, res) => {
    try{
        const user = await User.find();
        res.send(user);
    }catch (error) {
        res.send(error);
    }
});
//Get user data from database using user id
app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id});
        if(!user){
            return res.send(user);                
        }
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//Add user information to database
app.post("/add", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//Running application at localhost:2000
app.listen(PORT, function (){
    console.log("Server is running on 2000")
    mongoose.connect(DB_URL).then(
        function(){
            console.log("Database is connected")
        }
    ).
    catch(
        function(){
            console.log("Database connecting error!")
        }
    )
    
    
})


