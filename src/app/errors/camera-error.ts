export class CameraError extends Error {
    public key = 'CAMERA_NOT_ACCESSIBLE';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, CameraError.prototype);
        this.name = this.constructor.name;
        this.message = message ? message : 'Camera access not possible. Make sure your device has a camera.';
    }
}
