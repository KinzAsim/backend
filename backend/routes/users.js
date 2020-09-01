const router = require('express').Router();                                         //express route
let User = require ('../models/user.model');                                        //require the model, this is a mongoose model

router.route('/').get((req, res)=> {                                                //first route( that handles http git request on the slash user url path)
    User.find()                                                                     //it returns a promise in (res.json) json format
    .then(users => res.json(users))                                                 //return users that we got from the database
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res)=> {                                           //post request to add new user
    const username = req.body.username;                                            //create new instance of user
    const newUser = new User({ username });

    newUser.save()                                                                 //newUser save to the DB
    .then(()=> res.json('User added!'))                                            //return Json
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;