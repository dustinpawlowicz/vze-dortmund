export class Picture {
    filename: string;
    path: string;
    dataUrl: string;

    constructor(filename: string, path: string, dataUrl: string) {
        this.filename = filename;
        this.path = path;
        this.dataUrl = dataUrl;
    }
}
