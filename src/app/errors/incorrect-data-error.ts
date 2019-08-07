export class IncorrectDataError extends Error {
    public key = 'INCORRECT_DATA';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, IncorrectDataError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'The input is incorrect! Please check your data.';
    }
}
