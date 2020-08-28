class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code=errorCode; //Add a code property
    }
}

module.exports=HttpError;