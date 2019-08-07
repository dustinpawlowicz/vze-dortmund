import { UserProperty } from './user';
import { BasicData } from './basic-data';
import { OrderPositions } from './order-position';

export class RoadCondition {
    basicData: BasicData;
    orderPositions: OrderPositions;
    comments: string[];
    userProperty: UserProperty;

    constructor(basicData: BasicData, orderPositions: OrderPositions, comments: string[], userProperty: UserProperty) {
        this.basicData = basicData;
        this.orderPositions = orderPositions;
        this.comments = comments;
        this.userProperty = userProperty;
    }

    public getDefaultExportData(): any {
        return {
            ...this.basicData.getExportData(),
            comments: this.comments.join(),
            username: this.userProperty.username
        };
    }
}
