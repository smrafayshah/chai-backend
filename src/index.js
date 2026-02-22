// require('dotenv').config({ path: './env' }) //this statement is correct but breaking consistency of not using require, we are using import instead of requrie

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

const app = express();

dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`);
            // console.log(process.env.MONGODB_URI);
        })

    })
    .catch((err) => {
        console.log("MONGODB connection failed !!! ", err);

    })












/*

import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);

        })

    } catch (error) {
        console.log("ERROR: ", error)
        throw error;
    }
})()

*/

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { DB_NAME } from "./constants.js";

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("My express is not able to connect ERROR:", error);

//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log(`Error horha hota: ${error}`);
//         throw (error);
//     }
// })()

