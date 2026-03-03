import { Router } from "express";
// import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    // using middeleware to handle multipart/form-data (for file uploads)
    upload.fields([ // can use upload.single("avatar") if only one file is expected or upload.array("avatars", 5) if multiple files with same field name are expected (array 1 hi field m multiple files leta h to array use nhi krrhe yahan)
        { //field array accept krta h
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage", // file ka name jo frontend se aayega
            maxCount: 1 // maxCount specify krta h ki is field m kitne files expect krte h (1 file expect krte h to maxCount 1 rakhna chahiye)
        }
    ]),
    registerUser

) // e.g: http://localhost:8000/api/v1/users/register





export default router
