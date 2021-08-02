const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require('./routes/auth');

dotenv.config();
const app = express();

app.use('/auth',authRouter);

const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3qwie.mongodb.net/user?retryWrites=true&w=majority`
mongoose
    .connect(
        mongoURL,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then((res) => {
        console.log('connected');
        app.listen(8000, ()=>console.log("server started"));
    })
    .catch((err) => console.log(err));
