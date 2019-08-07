export interface Property {
    id: number;
    key: string;
}

export abstract class AbstractProperty implements Property {
    id: number;
    key: string;

    constructor(id: number, key: string) {
        this.id = id;
        this.key = key;
    }

    public getProperty(): Property {
        return { id: this.id, key: this.key };
    }
}
