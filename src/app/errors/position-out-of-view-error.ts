export class PositionOutOfMapError extends Error {
    public key = 'POSITION_OUT_OF_MAP';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, PositionOutOfMapError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'Location out of map.';
    }
}
