//const uuid =require('uuid/v4');
const HttpError =require('../models/http-error');
const { validationResult}=require("express-validator");
const User=require('../routes/userschema');

const getUsers = async (req,res,next) => {
    let users;
    try{
        users= await User.find({}, '-password');
    }catch(err)
    {
        const error=new HttpError('Fetching users failed', 500);
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({getters:true}))});
    
};

const signup = async (req,res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        //console.log(errors);
        return next(new HttpError("Invalid input passed", 422));
    }

    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser= await User.findOne({email: email});
    }catch(err)
    {
        const error=new HttpError('Signup failed',500);
        return next(error);
    }

    if(existingUser){
        const error=new HttpError('user exists please login',422);
        return next(error);
    }
    const createdUser = new User({
        name,
        email,
        password
    });
    try{
        await createdUser.save();
      }
      catch(err){
        console.log(err);
        const error =new HttpError('FAILED!!!',500);
        return next(error);
      }
    res.status(201).json({ user : createdUser.toObject( {getters:true} )});
};

const login = async (req,res,next) => {
    const { email, password}=req.body;
    
    let existingUser;
    try{
        existingUser= await User.findOne({email: email});
    }
    catch(err)
    {
        const error=new HttpError('Login failed',500);
        return next(error);
    }

    if(!existingUser || existingUser.password !== password)
    {
        const error = new HttpError('could not login',401);
        return next(error);
    }
    res.json({ message: existingUser._id, name:existingUser.name });
};

exports.getUsers=getUsers;
exports.signup=signup;
exports.login=login;