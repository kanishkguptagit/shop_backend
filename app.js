const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = require('./router/auth');
const productRouter = require('./router/product');
const cartRouter = require('./router/cart');
const orderRouter = require('./router/orders');

const app = express();

app.use(express.json());

app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);

const mongo_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3qwie.mongodb.net/shopify?retryWrites=true&w=majority`;
mongoose
    .connect(mongo_url, {
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useFindAndModify: false
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
