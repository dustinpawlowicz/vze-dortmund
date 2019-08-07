import { AbstractProperty } from './property';

export class Sign extends AbstractProperty {
    id: number;
    key: string;
    name: string;

    constructor(sign: any) {
        super(sign.id, sign.key);
        this.name = sign.name;
    }
}

export class SingCategory extends AbstractProperty {
    id: number;
    key: string;
    sign: Sign[] = new Array<Sign>();

    constructor(signCategory: any) {
        super(signCategory.id, signCategory.key);

        if  (signCategory.signs) {
            signCategory.signs.forEach(sign => {
                this.sign.push(new Sign(sign));
            });
        }
    }
}
