export class IncompleteDataError extends Error {
    public key = 'INCOMPLETE_DATA';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, IncompleteDataError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'The input is incomplete! Please enter all required data.';
    }
}
