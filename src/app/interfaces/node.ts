import { Geometry } from './geometry';


interface DefaultNode {
    id: number;
    nodeKey: string;
    geometry: Geometry;
}

export class Node implements DefaultNode {
    id: number;
    nodeKey: string;
    geometry: Geometry;

    constructor(node: any) {
        this.id = node.id;
        this.nodeKey = node.node_key;
        this.geometry = node.geometry;
    }
}

/**
 * JSON example:
 *
 *  "id": 1,
 *  "node_key": "00000001",
 *  "geometry": {
 *      "type": "Point",
 *      "coordinates": [
 *          7.32568733089837,
 *          51.4997815808571
 *      ]
 *  }
 */
