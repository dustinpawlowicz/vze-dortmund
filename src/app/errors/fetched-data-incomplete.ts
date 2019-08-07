export class FetchedDataIncompleteError extends Error {
    public key = 'FETCHED_DATA_INCOMPLETE';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, FetchedDataIncompleteError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'Fetched data incomplete. The action can still be performed without problems.';
    }
}
