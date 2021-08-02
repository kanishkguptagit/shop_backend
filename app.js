const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const mongo_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3qwie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
    .connect(mongo_url, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    })
    .then((result) => {
        console.log("connected to mongo");
        app.listen(process.env.SHOPIFY_BACKEND_PORT, () => {
            console.log(
                `server up and running on ${process.env.SHOPIFY_BACKEND_PORT}`
            );
        });
    })
    .catch((err) => console.log(err));
