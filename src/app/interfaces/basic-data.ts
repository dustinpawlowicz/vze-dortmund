import { Property } from './property';

interface DefaultBasicData {
    location: string;
    roadName: string;
    houseNumberSectionLeft: string;
    houseNumberSectionRight: string;
    houseNumber: string;
    addressAddition: string;
    priority: Property;
    departement: Property;
    surface: Property;
    shortText: string;
    longText: string;
    detectionDate: string;

    getExportData(): any;
}

export class BasicData implements DefaultBasicData {
    location: string;
    roadName: string;
    houseNumberSectionLeft: string;
    houseNumberSectionRight: string;
    houseNumber: string;
    addressAddition: string;
    priority: Property;
    departement: Property;
    surface: Property;
    shortText: string;
    longText: string;
    detectionDate: string;

    constructor(data: any) {
        this.location = data.location;
        this.roadName = data.roadName;
        this.houseNumberSectionLeft = data.houseNumberSectionLeft;
        this.houseNumberSectionRight = data.houseNumberSectionRight;
        this.houseNumber = data.houseNumber;
        this.addressAddition = data.addressAddition;
        this.priority = data.priority;
        this.departement = data.departement;
        this.surface = data.surface;
        this.shortText = data.shortText;
        this.longText = data.longText;
        this.detectionDate = data.detectionDate;
    }

    public getExportData(): any {
        return {
            location: this.location,
            roadName: this.roadName,
            houseNumberSectionLeft: this.houseNumberSectionLeft,
            houseNumberSectionRight: this.houseNumberSectionRight,
            houseNumber: this.houseNumber,
            addressAddition: this.addressAddition,
            priority: this.priority.key,
            departement: this.departement.key,
            surface: this.surface.key,
            shortText: this.shortText,
            longText: this.longText,
            detectionDate: this.detectionDate
        };
    }


}
