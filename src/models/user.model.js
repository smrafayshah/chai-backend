import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// bson vs json
// mongodb automatically create user ID
// bcrypt is a library for hashing passwords, e.g: if someone save password like "rafay123", it will be hashed to something like "sdfjhsdfh2342342sdfh" and when user try to login, we will hash the password they entered and compare it with the hashed password in the database, if they match, then the password is correct
// bcryptjs is a library for hashing passwords in javascript, it is a wrapper around bcrypt library, it is easier to use and it is faster than bcrypt library

// json web token is a library for generating and verifying JSON Web Tokens, 
// it is used for authentication and authorization, it allows us to create a token that contains user
//  information and can be used to authenticate the user in subsequent requests, 
// it is also used to authorize the user to access certain resources, for example, 
// if we want to allow only admin users to access certain routes, we can include the user's role in the token and check it in the route handler

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,

        }


    }, { timestamps: true }
)

// .pre means that just before saving data do this method
userSchema.pre("save", async function (next) { // we cannot use () => {} callback function like this because it doesn't give us the access to use "this".
    if (!this.isModified("password")) return next() // we are using async await because this is cryptography it takes time to process

    this.password = bcrypt.hash(this.password, 10)
    next()
    // in this case we are first checking if password is moified or not, if not then return next means go to next method forgot this one
    // and if password is modified by the user then hash it using bcrypt and then go to the next method.
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // compare method compare the password entered by the user with the hashed password in the database, it returns true if they match and false if they don't match
}

// generateAccessToken and RefreshToken are for security reasons, GT are short term and RT are long term, 
// if we use only GT then user will have to login again after the token expires, and if we use only RT then if someone steal the token they can 
// use it for a long time, so we use both of them, GT for short term and RT for long term, and when GT expires we can use RT to generate a new GT without asking the user to login again.
userSchema.methods.generateAccessToken = function () { 
    return jwt.sign({ // sign method generate token
        _id: this._id, 
        email: this.email,
        username: this.username,
        fullName: this.fullName 
    },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}

// Used to generate new access tokens without logging in again
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ 
        _id: this._id,

    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)