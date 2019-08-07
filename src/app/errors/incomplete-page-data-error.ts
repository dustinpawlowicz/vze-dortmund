export class IncompletePageDataError extends Error {
    public key = 'INCOMPLETE_PAGE_DATA';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, IncompletePageDataError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'The page is missing data to continue.';
    }
}
