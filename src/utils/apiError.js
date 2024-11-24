class apiError extends Error{



    constructer (
        statusCode,
        message = "Somthing went to rong ",
        errors = [],
        statck =""  
    ){
        super(message)
        this.message = statusCode
        this.data = null
        this.message =message
        this.success = false
        this.errors = errors
        
        if (statck) {
            this.stack = statck
            
        }else{
            Error.captureStackTrace(this,this.constructer)
        }
    }
}


export {apiError}