const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
const server = http.createServer();

app.use(cors());                                                                                               //middleware
app.use(express.json());   
// app.use((req, res, next)=>{
//     res.status(400).json({
//         message:'It works!'
//     });
// });                                                                                                         //allows to pass JSON

const uri = process.env.ATLAS_URI;                                                                             //mongoDB uri
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, 
    ()=>{
    console.log('connected to DB')
});                                                                                                            //pass uri & start connection(flags used to update DB)


const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');                                                        //call exercises  and users
const usersRouter = require('./routes/users');
 
app.use('/exercises', exercisesRouter);                                                                        // Route fields
app.use('/users', usersRouter);

app.listen(port, ()=> {                                                                                        //Listening on a certain port
    console.log(`Server is running on port: ${port}`);
})