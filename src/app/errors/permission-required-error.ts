export class PermissionRequiredError extends Error {
    public key = 'PERMISSION_REQUIRED';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, PermissionRequiredError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'Permission is required.';
    }
}
