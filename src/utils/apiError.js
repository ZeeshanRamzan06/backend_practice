class apiError extends Error{



    constructer (
        statusCode,
        message = "Somthing went to rong ",
        errors = [],
        stack =""  
    ){
        super(message)
        this.message = statusCode
        this.data = null
        this.message =message
        this.success = false
        this.errors = errors
        
        if (stack) {
            this.stack = stack
            
        }else{
            Error.captureStackTrace(this,this.constructer)
        }
    }
}


export {apiError}