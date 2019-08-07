export class WatchPositionError extends Error {
    public key = 'WATCH_POSITION';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, WatchPositionError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'Location check failed. Please check your location settings.';
    }
}
