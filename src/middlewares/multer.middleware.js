import multer from "multer";

//why we use multer?
//multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It makes it easy to handle file uploads in Node.js applications.
// normally in middlewares we have access to req, res and next but in multer we have access to req, file and cb (callback function), so we can use multer to handle file uploads in our application, and we can configure it to specify where to store the uploaded files and how to name them.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp") // null represents no error, and "./public/temp" is the directory where the uploaded files will be stored.
    },
    filename: function (req, file, cb) { // this function is used to specify the name of the uploaded file. In this case, we are using the original name of the file.

        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})