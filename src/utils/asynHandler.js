const asyncHandler = (requestHandler) => { // this is a higher-order function that takes a request handler as an argument 
    // and returns a new function that wraps the request handler in a try-catch block or in a promise to handle any errors that may occur during the execution of the request handler, 
    // this is useful to avoid writing try-catch blocks in every request handler and to centralize the error handling logic in one place.
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export { asyncHandler }

// const asynchandlers = (requestHandler) => {
//     return (req, res, next) => {
//         Promise
//             .resolve(requestHandler(req, res, next))
//             .catch((err) => next(err))
//     }
// }

// const asyncHandlers = (requestHandler) => {
//     return (req, res, next) => {
//         Promise
//             .resolve(requestHandler(req, res, next))
//             .catch((err) => next(err))
//     }
// }

// const AsyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise
//             .resolve(requestHandler(req, res, next))
//             .catch((err) => next(err))
//     }
// }
//const asyncHandler = () => {}
//const asyncHandler = (func) => () => {}
//const asyncHandler = (func) => async () => {}


// // method 2
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }