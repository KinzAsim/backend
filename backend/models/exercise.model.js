const mongoose = require('mongoose');

const Schema = mongoose.Schema;                                                             //create DB Schema using Mongoose

const exerciseSchema = new Schema ({                                                        //All info store about the exercise
    username: { type: String, required: true },
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    //date: {type: Date, required:true},
},
{
    timestamps: true,                                                                       //Which creates automatically fields
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;