const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const HttpError=require('./models/http-error');
const notesRoute=require('./routes/notes-routes');
const app = express();
const mongoose = require('mongoose');
const userRoute=require('./routes/user-routes');
app.use(
    cors({
      origin: "http://localhost:3000", // restrict calls to those this address
      credentials: true,
    })
  );

app.use('/api/note', notesRoute ); 
app.use('/api/user', userRoute);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route ', 404);
    throw  error;
})
app.use((error, req, res, next)=> {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || "An unknown error occured"});
});


mongoose.connect('mongodb+srv://hardikuser:hardikpassword@cluster0.eli69.mongodb.net/demo?retryWrites=true&w=majority')
.then(() => { app.listen(8000);})
.catch( err => { console.log(err)});
