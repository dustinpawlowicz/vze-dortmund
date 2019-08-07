import { Property, AbstractProperty } from './property';

export class Magnitude extends AbstractProperty {
    id: number;
    key: string;
    text: string;

    constructor(magnitude: any) {
        super(magnitude.id, magnitude.key);
        this.text = magnitude.text;
    }
}

export class ConditionIndicator extends AbstractProperty {
    id: number;
    key: string;
    magnitude: Magnitude[] = new Array<Magnitude>();

    constructor(conditionIndicator: any) {
        super(conditionIndicator.id, conditionIndicator.key);

        if  (conditionIndicator.magnitudes) {
            conditionIndicator.magnitudes.forEach(magnitude => {
                this.magnitude.push(new Magnitude(magnitude));
            });
        }
    }
}

export class ConditionCharacteristic extends AbstractProperty {
    id: number;
    key: string;
    conditionIndicator: ConditionIndicator[] = new Array<ConditionIndicator>();

    constructor(conditionCharacteristic: any) {
        super(conditionCharacteristic.id, conditionCharacteristic.key);

        if  (conditionCharacteristic.condition_indicators) {
            conditionCharacteristic.condition_indicators.forEach(conditionIndicator => {
                this.conditionIndicator.push(new ConditionIndicator(conditionIndicator));
            });
        }
    }
}

export class CharacteristicGroup extends AbstractProperty {
    id: number;
    key: string;
    conditionCharacteristic: ConditionCharacteristic[] = new Array<ConditionCharacteristic>();

    constructor(characteristicGroup: any) {
        super(characteristicGroup.id, characteristicGroup.key);

        if  (characteristicGroup.condition_characteristics) {
            characteristicGroup.condition_characteristics.forEach(conditionCharacteristic => {
                this.conditionCharacteristic.push(new ConditionCharacteristic(conditionCharacteristic));
            });
        }
    }
}
