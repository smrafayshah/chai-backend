import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "chai aur code"
    // })

    // get user details from frontend
    // validation - not empty (check if email is correct or not, password is strong or not, username is valid or not)
    // check if user already exist: username, email
    // check for images, check for avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response


    const { fullName, email, username, password } = req.body
    // console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "") // some - we can check a condition onto it and it will return either true or false
        // field m user input dega agar field h to usse trim krdo (maybe extra spaces hatado) or agar wo empty h to true return krdo, agar 1 bhi field n true return kra to mtlb wo field khali tha
    ) {
        throw new ApiError(400, "All fields are requied!");

    }

    const existedUser = await User.findOne({    // it is to find if this user already existed  // User.findOne({email})
        $or: [{ username }, { email }] // $o r - is operator, start an array and put any quantity of object to check or validate
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already existeds")
    }

    // console.log(req.files);


    // all the data is in req.body but now multer is giving some additional functionality and giving us the access to req.files
    const avatarLocalPath = req.files?.avatar[0]?.path; // we are having avatar[0] basically its a first property, first property k ander ek object milta h uso optionally loge to ap .path likhskte ho(pora path jo multer n upload kra h wo apko miljayega)
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }



    if (!avatarLocalPath) { // avatar is required thats why we are doing a validation check
        throw new ApiError(400, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")

    }

    const user = await User.create({ //entring data in database
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken") // .select unselect the fields starting with - sign
    // we have remove password and refresh token in response 
    if (!createdUser) {
        throw (500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})
export {
    registerUser,
}