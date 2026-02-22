class ApiError extends Error {
    constructor(  // Error ek class h or constructor uska built in feature, iske ander bohot s features hotey h jese k stack, message, statuscode etc.
        // constructor m hm unhen initialize krtey h or niche apne errors s overwrite krdete h
        statusCode, // zarori h dena
        message = "Something went wrong", // sample message if there will be no message
        errors = [], // for multiple errors
        stack = "" // error stack, if its available, give it otherwise serve it empty
    ) {
        super(message) // when we overwrite something we have to use super
        this.statusCode = statusCode // overwriting
        this.data = null // usually data field ko null krdya jata h.
        this.message = message
        this.success = false; // api errors ko handle krtey hoye success code serve nhi krtey, api response m serve krtey h
        this.errors = errors

        if (stack) { // not neccessary
            this.stack = stack // history of errors,
        } else {
            Error.captureStackTrace(this, this.constructor) // stacktrace m hm n uska instance pass krdya k hm kis context m baat krrhe h
        }
    }
}

export { ApiError }


// class ApiErrors extends Error {
//     constructor(
//         statusCode,
//         message = 'Something Went Wrong!',
//         error = [],
//         stack = ''
//     ) {
//         super(message)
//         this.message = message
//         this.statusCode = statusCode
//         this.error = error
//         this.data = null
//         this.success = false

//         if (stack) {
//             this.stack = stack
//         }
//         else {
//             Error.captureStackTrace(this, this.constructor)
//         }

//     }
// }

// export { ApiErrors }