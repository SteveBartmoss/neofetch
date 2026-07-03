
export class HttpError extends Error {
    
    constructor(message,status,data,url){
        super(message)
        this.status = status
        this.data = data
        this.url = url
    }
    
}