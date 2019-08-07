import { Property } from './property';
import { Picture } from './picture';
import { Sign } from './sign';

abstract class DefaultOrderPosition {
    pictures: Picture[];

    constructor(pictures: Picture[]) {
        this.pictures = pictures ? pictures : new Array<Picture>();
    }

    public getSeparatedDataUrls(): string {
        return this.pictures.map(picture => picture.dataUrl).join();
    }

    abstract getExportData(): any;
}



export class StandardOrderPosition extends DefaultOrderPosition {
    characteristicGroupProperty: Property;
    conditionCharacteristicProperty: Property;
    conditionIndicatorProperty: Property;
    magnitudeProperty: Property;
    magnitudeText: string;
    expansion: string;
    pictures: Picture[];

    constructor(
        characteristicGroupProperty: Property,
        conditionCharacteristicProperty: Property,
        conditionIndicatorProperty: Property,
        magnitudeProperty: Property,
        magnitudeText: string,
        expansion: string,
        pictures?: Picture[]) {
            super(pictures);
            this.characteristicGroupProperty = characteristicGroupProperty;
            this.conditionCharacteristicProperty = conditionCharacteristicProperty;
            this.conditionIndicatorProperty = conditionIndicatorProperty;
            this.magnitudeProperty = magnitudeProperty;
            this.magnitudeText = magnitudeText;
            this.expansion = expansion;
    }

    public getExportData(): any {
        return {
            characteristicGroup: this.characteristicGroupProperty.key,
            conditionCharacteristic: this.conditionCharacteristicProperty.key,
            conditionIndicator: this.conditionIndicatorProperty.key,
            magnitude: this.magnitudeProperty.key,
            magnitudeText: this.magnitudeText,
            expanse: this.conditionIndicatorProperty.key,
            pictures: this.getSeparatedDataUrls()
        };
    }
}

export class SignageOrderPosition extends DefaultOrderPosition {
    count: number;
    text: string;
    signCategoryProperty: Property;
    sign: Sign;
    pictures: Picture[];

    constructor(count: number, text: string, signCategoryProperty: Property, sign: Sign, pictures?: Picture[]) {
        super(pictures);
        this.count = count;
        this.text = text;
        this.signCategoryProperty = signCategoryProperty;
        this.sign = sign;
    }

    public getExportData(): any {
        return {
            count: this.count,
            text: this.text,
            signCategory: this.signCategoryProperty.key,
            sign: this.sign.key,
            pictures: this.getSeparatedDataUrls()
        };
    }
}

export class CustomOrderPosition extends DefaultOrderPosition {
    count: number;
    text: string;
    pictures: Picture[];

    constructor(count: number, text: string, pictures?: Picture[]) {
        super(pictures);
        this.count = count;
        this.text = text;
    }

    public getExportData(): any {
        return {
            count: this.count,
            text: this.text,
            pictures: this.getSeparatedDataUrls()
        };
    }
}

export class OrderPositions {
    standardOrderPositions: StandardOrderPosition[] = new Array<StandardOrderPosition>();
    signageOrderPosition: SignageOrderPosition[] = new Array<SignageOrderPosition>();
    customOrderPosition: CustomOrderPosition[] = new Array<CustomOrderPosition>();

    constructor() { }

    public hasOrder(): boolean {
        return this.standardOrderPositions.length > 0 || this.signageOrderPosition.length > 0 || this.customOrderPosition.length > 0;
    }

    public addOrderPosition(orderPositions: any): void {
        if (!orderPositions) {
            return;
        }

        if (orderPositions instanceof StandardOrderPosition) {
            this.standardOrderPositions.push(orderPositions);
            console.log('Standard order position added');
        } else if (orderPositions instanceof SignageOrderPosition) {
            this.signageOrderPosition.push(orderPositions);
            console.log('Signage order position added');
        } else if (orderPositions instanceof CustomOrderPosition) {
            this.customOrderPosition.push(orderPositions);
            console.log('Custom order position added');
        }
    }

    public deleteOrderPosition(orderPosition: any): void {
        if (!orderPosition) {
            return;
        }

        if (orderPosition instanceof StandardOrderPosition) {
            const index = this.standardOrderPositions.indexOf(orderPosition, 0);
            if (index > -1) {
                this.standardOrderPositions.splice(index, 1);
            }
            console.log('Standard order position removed');
        } else if (orderPosition instanceof SignageOrderPosition) {
            const index = this.signageOrderPosition.indexOf(orderPosition, 0);
            if (index > -1) {
                this.signageOrderPosition.splice(index, 1);
            }
            console.log('Signage order position removed');
        } else if (orderPosition instanceof CustomOrderPosition) {
            const index = this.customOrderPosition.indexOf(orderPosition, 0);
            if (index > -1) {
                this.customOrderPosition.splice(index, 1);
            }
            console.log('Custom order position removed');
        }
    }
}
