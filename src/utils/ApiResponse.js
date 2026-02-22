class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}
export { ApiResponse }

// class ApiResponses{
//     constructor(message = "success", statusCode, data){
//         this.statusCode = statusCode
//         this.message = message
//         this.data = data
//         this.success = statusCode < 400
//     }
// }

// export {ApiResponses}