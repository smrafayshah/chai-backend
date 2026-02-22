import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // e.g., "http://localhost:3000", this is a cross-origin request, so we need to specify the origin and allow not everyone to access our API, only the specified origin can access it
    credentials: true

}))

app.use(express.json({ limit: "16kb" })) // here we set the limit for the request body to 16kb, if the request body exceeds this limit, it will throw an error, this is to prevent DoS attacks, where the attacker can send a large request body to our server to consume our resources and make our server unavailable
app.use(express.urlencoded({ extended: true, limit: "16kb" })) // extended: true means we can parse objects inside the objects, for example, if we have a request body like this: { "user": { "name": "John", "age": 30 } }, we can parse it and get the name and age of the user, 
// if we set extended: false, we can only parse simple key-value pairs, for example, { "name": "John", "age": 30 }, we cannot parse the user object inside the request body
//btw we are not going to use extended most of the cases.
app.use(express.static("public")) // this is to serve static files from the public folder, for example, if we have a file called "index.html" in the public folder, we can access it by going to http://localhost:5000/index.html, 
// this is useful for serving the frontend of our application, we can put all the frontend files in the public folder and serve them from there.
app.use(cookieParser()) // this is to access and set the cookies from the browser of our user to perform crud operations on the cookies.


export { app }

// MONGODB_URI=mongodb+srv://rafay:rafay123@cluster0.lkctdyh.mongodb.net