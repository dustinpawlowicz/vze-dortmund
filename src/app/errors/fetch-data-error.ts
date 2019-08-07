export class FetchDataError extends Error {
    public key = 'FETCH_DATA';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, FetchDataError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'The required data could not be fetched.';
    }
}
