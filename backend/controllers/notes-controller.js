//const uuid = require('uuid/v4');
const express =require('express');
const HttpError=require('../models/http-error');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { validationResult } = require("express-validator"); 
const { Console } = require('console');
const defineschema =require('../routes/defineschema');
const { use } = require('../routes/user-routes');
const User=require('../routes/userschema');
const mongoose = require('mongoose');

const viewAll = async (req,res,next) => {
  var NOTES="",
  NOTES=await defineschema.find().then().catch((err)=>{
    console.log(err);
    return next("an error occured");
  });
  res.json({NOTES});
}

const notesById = async (req, res, next) => {
    const creator = req.params.uid;
    var note="";
    try{
        note=await defineschema.find({creator:creator});
    }
    catch(err)
    {
      console.log(err);
      const error = new HttpError('cannot find note',500);
      return next(error);
    }
    if(!note)
    {
      const error= (new HttpError(('could not find a note for given user id'),404));
      return next(error);
    }
     res.json({note : note}); // => { place } => { place: place }
  };

  const getnotebyname = async (req, res, next)=> {
    const name=req.params.uname;
    let note;
    try{
      note=await defineschema.find({ creatorname: name});
    }
    catch(err){
      console.log(err);
      const error = new HttpError('cannot find place',500);
      return next(error);
    }
    if(!note || note.length === 0)
    {
        const error=(new HttpError(('could not find any note for given username'),404));
        return next(error);
    }
    res.json({note: note.map(note => note.toObject( {getters:true}))});
};

const createNote = async (req,res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid input passed", 422);
    }
    const {title, descreption, creator, creatorname} = req.body;
     const createdNote =new defineschema({
         title,
         descreption,
         creator,
         creatorname
     });
     //console.log("sswfewf-",createdNote);
     let user;
     try{
       console.log(creator);
       user=await User.findById(creator);
       console.log(user);
     }
     catch(err){
         console.log(err);
         const error = newHttpError("user not found!!",500);
         return next(error);
     }
     //console.log("user----",user);
     if(!user)
     {
       const error=new HttpError('cannot find user',500);
       return next(error);
     }
     try{
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdNote.save({session:sess});
      //console.log("session---",sess);
      user.notes.push(createdNote);
      await user.save({session:sess});
      await sess.commitTransaction();
     }
     catch(err){
       console.log(err);
       const error =new HttpError('FAILED!!!',500);
       return next(error);
     }
     res.status(200).json({note:createdNote});
};

const updateNote = async (req, res, next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid input passed to update", 422);
    }
    const {title, descreption} =req.body;
    const userId=req.params.uid;

    let note;
    try{
        note=await defineschema.findById(userId);
      }
      catch(err){
        console.log(err);
        const error=new HttpError("Something went wrong", 500);
        return next(error);
      }

    note.title=title;
    note.descreption=descreption;

    try{
        await note.save();
    }
    catch(err){
      console.log(err);
      const error=new HttpError("Something went wrong", 500);
      return next(error);
    }
    res.status(200).json({note : note.toObject( {getters:true} )});
};

const deleteNote = async (req, res, next) => {
    const userId=req.params.uid;

    let note;
    try{
      note=await defineschema.findById(userId).populate('creator');
      
    }
    catch(err)
    {
      console.log("error----",err);
      console.log('hellohere!!!!!');
      console.log('note--',note);
      const error = new HttpError('something went wrong',500);
      return next(error);
    }
    
    if(!note)
    {
      const error=new HttpError('cannot find note', 404);
      return next(error);
    }
    
    try{
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await note.remove({session:sess});
      note.creator.notes.pull(note);
      await note.creator.save({session:sess});
      await sess.commitTransaction();
    }
    catch(err){
      //console.log(err);
      const error=new HttpError('Something went wrong here!!', 500);
      return next(error);
    }

    res.status(200).json({message: 'deleted!!!'});
};

  exports.notesById=notesById;
  exports.getnotebyname=getnotebyname;
  exports.createNote=createNote;
  exports.updateNote=updateNote;
  exports.deleteNote=deleteNote;
  exports.viewAll=viewAll;