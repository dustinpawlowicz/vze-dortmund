export class UnknownError extends Error {
    public key = 'UNKNOWN';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, UnknownError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'An unknown error has occurred.';
    }
}
