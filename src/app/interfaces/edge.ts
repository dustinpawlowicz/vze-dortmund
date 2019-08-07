import { Geometry } from './geometry';

interface DefaultEdge {
    id: number;
    roadNumber: string;
    roadName: string;
    sectionNumber: number;
    fromNodeKey: string;
    toNodeKey: string;
    roadLength: number;
    houseNumberFromRight: number;
    houseNumberToRight: number;
    houseNumberFromLeft: number;
    houseNumberToLeft: number;
    geometry: Geometry;
}

export class Edge implements DefaultEdge {
    id: number;
    roadNumber: string;
    roadName: string;
    sectionNumber: number;
    fromNodeKey: string;
    toNodeKey: string;
    roadLength: number;
    houseNumberFromRight: number;
    houseNumberToRight: number;
    houseNumberFromLeft: number;
    houseNumberToLeft: number;
    geometry: Geometry;

    constructor(edge: any) {
        this.id = edge.id;
        this.roadNumber = edge.road_number;
        this.roadName = edge.road_name;
        this.sectionNumber = edge.section_number;
        this.fromNodeKey = edge.from_node_key;
        this.toNodeKey = edge.to_node_key;
        this.roadLength = edge.road_length;
        this.houseNumberFromRight = edge.house_number_from_right;
        this.houseNumberToRight = edge.house_number_to_right;
        this.houseNumberFromLeft = edge.house_number_from_left;
        this.houseNumberToLeft = edge.house_number_to_left;
        this.geometry = edge.geometry;
    }
}

/**
 * JSON example:
 *
 *  "id": 1,
 *  "road_number": "70529",
 *  "road_name": "Bertastraße",
 *  "section_number": 20,
 *  "from_node_key": "00000505",
 *  "to_node_key": "00000504",
 *  "road_length": 26,
 *  "house_number_from_right": 0,
 *  "house_number_to_right": 0,
 *  "house_number_from_left": 0,
 *  "house_number_to_left": 0,
 *  "geometry": {
 *      "type": "LineString",
 *      "coordinates": [
 *          [
 *              7.33569398757183,
 *              51.5003681714194
 *          ],
 *          [
 *              7.3356393241199,
 *              51.5003697336666
 *          ],
 *          [
 *              7.33554842239836,
 *              51.500563132776
 *          ]
 *      ]
 *  }
 */
