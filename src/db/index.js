import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {

        // mconnectionInstance is the connection object returned by mongoose.connect() method and its holding the response coming from mongodb  server
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`); // jo bhi connection instance m respond arha h usme s mongoDB k url m s host lelen qnke production m different tarah k servers hotey h to host s pata lagjata is wqt is server pr h

    } catch (error) {
        console.log("MONGODB connection Failed", error);
        process.exit(1); // kill the app if error, close operation!

    }

}

export default connectDB;

// to avoid code again and again to connect to the database in every different file,
// we can create asynchandler function in utils folder and use it in every file where we want to connect to
//  the database, this is to avoid code duplication and to centralize the database connection logic in one place, so
//  that if we want to change the database connection logic, we can do it in one place and it will be reflected
//  in all the files where we are using it.

// -r dotenv/config --experimental-json-modules