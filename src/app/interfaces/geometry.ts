export interface Geometry {
    type: string;
    coordinates: number[][];
}

/**
 * JSON examples:
 *
 *  "geometry": {
 *      "type": "Point",
 *      "coordinates": [
 *          7.32568733089837,
 *          51.4997815808571
 *      ]
 *  }
 *
 * ----------------------------
 *
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
