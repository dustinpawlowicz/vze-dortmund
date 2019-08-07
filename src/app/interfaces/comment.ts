import { AbstractProperty } from './property';

export class Comment extends AbstractProperty {
    id: number;
    key: string;
    text: string;

    constructor(comment: any) {
        super(comment.id, comment.key);
        this.text = comment.text;
    }
}
