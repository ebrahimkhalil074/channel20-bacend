
class apiError extends Error {
    statusCode: number;
    stack?: string | undefined;
    constructor(statusCode:number, message: string,stack =''){
     super(message)
     this.statusCode = statusCode
     if (stack) {
        this.stack = stack
     } else {
        Error.captureStackTrace(this, this.constructor)
     }
    }
}

export default  apiError