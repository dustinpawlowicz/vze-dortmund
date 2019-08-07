import { Platform } from '@ionic/angular';
import { WatchPositionError } from './../../errors/watch-position-error';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { PermissionRequiredError } from './../../errors/permission-required-error';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Observable, BehaviorSubject } from 'rxjs';
import { Node } from '../../interfaces/node';
import { Edge } from '../../interfaces/edge';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

enum Endpoint {
  NODES = '/nodes',
  EDGES = '/edges',
}

@Injectable({
  providedIn: 'root'
})
export class RoadNetworkService {
  private nodes: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>(null);
  private edges: BehaviorSubject<Edge[]> = new BehaviorSubject<Edge[]>(null);

  private geoJsonNodes: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private geoJsonEdges: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiService,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform) {
  }

  /**
   * fetchNodes - Fetch the existing road network nodes.
   *
   * @param data  data to be transmitted with the request
   * @return      the http request
   */
  public fetchNodes(data: any): Observable<any> {
    const request = this.apiService.post(Endpoint.NODES, data);

    request.subscribe((response) => {
      if (response.status === 'success') {
        this.setNodesAndGeoJson(response.data.nodes);
      }
    }, (error) => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * fetchEdges - Fetch the existing road network edges.
   *
   * @param data  data to be transmitted with the request
   * @return      the http request
   */
  public fetchEdges(data: any): Observable<any> {
    const request = this.apiService.post(Endpoint.EDGES, data);

    request.subscribe((response) => {
      if (response.status === 'success') {
        this.setEdgesAndGeoJson(response.data.edges);
      }
    }, (error) => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * setNodesAndGeoJson - Change the JSON nodes to GeoJSON and display them as a layer on the map.
   *
   * @param jsonNodes the JSON of the nodes that are converted to GeoJSON
   */
  private setNodesAndGeoJson(jsonNodes: any): void {
    if (jsonNodes) {
      const nodes = new Array<Node>();
      jsonNodes.forEach(element => {
        nodes.push(new Node(element));
      });

      this.setNodes(nodes);
      console.log('Nodes set:', this.nodes);

      const geojson = {
        type: 'FeatureCollection',
        features: [],
      };

      for (const node of this.nodes.value) {
        geojson.features.push({
          type: 'Feature',
          geometry: node.geometry,
          properties: {
            id: node.id,
            nodeKey: node.nodeKey
          }
        });
      }
      this.setGeoJsonNodes(geojson);
      console.log('GeoJSON nodes set:', this.geoJsonNodes);
    }
  }

  /**
   * setEdgesAndGeoJson - Change the JSON edges to GeoJSON and display them as a layer on the map.
   *
   * @param jsonEdges the JSON of the edges that are converted to GeoJSON
   */
  private setEdgesAndGeoJson(jsonEdges: any): void {
    if (jsonEdges) {
      const edges = new Array<Edge>();
      jsonEdges.forEach(element => {
        edges.push(new Edge(element));
      });

      this.setEdges(edges);
      console.log('Edges set:', this.nodes);

      const geojson = {
        type: 'FeatureCollection',
        features: [],
      };

      for (const edge of this.edges.value) {
        geojson.features.push({
          type: 'Feature',
          geometry: edge.geometry,
          properties: {
            id: edge.id,
            roadNumber: edge.roadNumber,
            roadName: edge.roadName,
            sectionNumber: edge.sectionNumber,
            fromNodeKey: edge.fromNodeKey,
            toNodeKey: edge.toNodeKey,
            roadLength: edge.roadLength,
            houseNumberFromRight: edge.houseNumberFromRight,
            houseNumberToRight: edge.houseNumberToRight,
            houseNumberFromLeft: edge.houseNumberFromLeft,
            houseNumberToLeft: edge.houseNumberToLeft
          }
        });
      }
      this.setGeoJsonEdges(geojson);
      console.log('GeoJSON edges set:', this.geoJsonEdges);
    }
  }

  /**
   * setNodes - Set new nodes for the subscribers.
   *
   * @param nodes the nodes to be set
   */
  private setNodes(nodes): void {
    this.nodes.next(nodes);
  }

  /**
   * setEdges - Set new edges for the subscribers.
   *
   * @param edges the edges to be set
   *
   */
  private setEdges(edges): void {
    this.edges.next(edges);
  }

  /**
   * setGeoJsonNodes - Set new GeoJSON nodes for the subscribers.
   *
   * @param geoJsonNodes the GeoJSON nodes to be set
   *
   */
  private setGeoJsonNodes(geoJsonNodes): void {
    this.geoJsonNodes.next(geoJsonNodes);
  }

  /**
   * setGeoJsonEdges - Set new GeoJSON edges for the subscribers.
   *
   * @param geoJsonEdges the GeoJSON edges to be set
   *
   */
  private setGeoJsonEdges(geoJsonEdges): void {
    this.geoJsonEdges.next(geoJsonEdges);
  }

  /**
   * getNodes - Observe the nodes for any changes.
   *
   * @return  Observable of the node array
   */
  public getNodes(): Observable<Node[]> {
    return this.nodes.asObservable();
  }

  /**
   * getEdges - Observe the nodes for any changes.
   *
   * @return  Observable of the edge array
   */
  public getEdges(): Observable<Edge[]> {
    return this.edges.asObservable();
  }

  /**
   * getGeoJsonNodes - Observe the GeoJSON nodes for any changes.
   *
   * @return  Observable of the GeoJSON nodes
   */
  public getGeoJsonNodes(): Observable<any> {
    return this.geoJsonNodes.asObservable();
  }

  /**
   * getGeoJsonEdges - Observe the GeoJSON edges for any changes.
   *
   * @return  Observable of the GeoJSON edges
   */
  public getGeoJsonEdges(): Observable<any> {
    return this.geoJsonEdges.asObservable();
  }

  /**
   * handleError - Error Handling of the Road Network Service.
   *
   * @param error error to handle
   */
  private handleError(error): void {
    if (!error && !error.error) {
      return;
    }

    if (!error.error.key) {
      console.warn('Server not responding!', error);
      return;
    }

    console.warn('An error occurred in RoadNetworkService. Key: %s, Msg: %s', error.error.key, error.error.msg );
  }

  /**
   * locationPermissionGranted - Check if the location permission is granted.
   *
   * @return a promise to be either resolved with the check permission result or rejected with an error
   */
  public locationPermissionGranted(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (!this.platform.is('android')) {
          resolve(true);
        }

        const accessFineLocation = await this.androidPermissions.checkPermission(
          this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
        );

        if (!accessFineLocation.hasPermission) {
          this.requestLocationPermission();
        }

        resolve(accessFineLocation.hasPermission);
      } catch (error) {
        this.requestLocationPermission();
        reject(new PermissionRequiredError());
      }
    });
  }

  private requestLocationPermission(): void {
    if (!this.platform.is('android')) {
      return;
    }

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
  }

  /**
   * locationActivated - Checks whether the user has switched on the location check of the device.
   *
   * @return  a promise to be either resolved with the location actived result or rejected with an error
   */
  public locationActivated(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (!this.platform.is('android')) {
          resolve(true);
        }

        const canRequest = await this.locationAccuracy.canRequest();
        console.log(canRequest);
        if (!canRequest) {
          throw new WatchPositionError();
        }
            // the accuracy option will be ignored by iOS
        const isLocationActivated = await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        console.log('loca', isLocationActivated);
        resolve(isLocationActivated);
      } catch (error) {
        console.log('error', error);
        reject(new WatchPositionError());
      }
    });
  }

  /**
   * watchPosition - Watch the current device's position.
   *
   * @return  the observable geoposition
   */
  public watchPosition(): Observable<Geoposition> {
    return this.geolocation.watchPosition();
  }
}
