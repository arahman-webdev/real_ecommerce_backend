class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode:number, statck?:string) {
        super(message)

        this.statusCode = statusCode


        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError