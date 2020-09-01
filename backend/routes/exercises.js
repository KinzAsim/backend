const router = require('express').Router();                                   //Need express router in the route fields
let Exercise = require('../models/exercise.model');
                                                                              // Here we perform CRUD 
router.route('/').get((req, res) => {                                         // this is the 1st in-points of exercise that handles http incoming get request on /
    Exercise.find()                                                           //this is our 1st route
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) =>{                                      //route( that handles http post request on the slash exercise/add url path)                                
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
   // const date = Date.parse(req.body.Date);


    const newExercise = new Exercise({                                        //creating new instance in DB
        username,
        description,
        duration,
       // date,
    });

    newExercise.save()
    .then(()=> res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: '+ err));

});

   router.route('/:id').get((req,res)=>{                                    //an object id automatically created by MongoDB
       Exercise.findById(req, res)
       .then(exercise => res.json(exercise))
       .catch(err => res.status(400).json('Error: '+err));
   });

   router.route('/:id').delete((req,res)=> {
       Exercise.findByIdAndDelete(req.params.id)                            //id from the url here
       .then(()=> res.json('Exercise deleted.'))
       .catch(err => res.status(400).json('Error: '+err));
   });


   router.route('/update/:id').post((req,res)=> {                           //id update
       Exercise.findById(req.params.id)                                     //first find the current exercise then update it
       .then(exercises => {
           exercises.username = req.body.username;
           exercises.description = req.body.description;
           exercises.duration = Number (req.body.duration);
           //exercise.date = Date.parse(req.body.date);

           exercises.save()
           .then(()=> res.json('Exercise updated!'))
           .catch(err => res.status(400).json('Error ' +err));
       })

       .catch(err => res.status(400).json('Error ' +err));
   });

 

module.exports = router;