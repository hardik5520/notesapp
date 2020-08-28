const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true},
    descreption: { type: String, required: true},
    creatorname:{type:String, required:true},  
    creator : {type:mongoose.Types.ObjectId, required:true, ref:'User'} 
});

module.exports=mongoose.model('Notes', noteSchema);