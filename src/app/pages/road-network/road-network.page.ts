import { PermissionRequiredError } from './../../errors/permission-required-error';
import { WatchPositionError } from './../../errors/watch-position-error';
import { PositionOutOfMapError } from 'src/app/errors/position-out-of-view-error';
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
import { HelperService } from './../../services/helper/helper.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Edge } from './../../interfaces/edge';
import { SettingsService } from './../../services/settings/settings.service';
import { RoadNetworkService } from './../../services/road-network/road-network.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import Leaflet from 'leaflet';
import { Subscription } from 'rxjs';
import { IncompletePageDataError } from 'src/app/errors/incomplete-page-data-error';

@Component({
  selector: 'app-road-network',
  templateUrl: './road-network.page.html',
  styleUrls: ['./road-network.page.scss'],
})
export class RoadNetworkPage implements OnInit, OnDestroy {
  private readonly LAT_LNG_CENTER = new Leaflet.latLng(51.5142473620059, 7.4653316331688);
  private readonly LAT_LNG_BOUNDS = new Leaflet.LatLngBounds(
    new Leaflet.LatLng(51.63, 7.27),
    new Leaflet.LatLng(51.39, 7.67)
  );
  private readonly RVR_WMS: string = 'https://geodaten.metropoleruhr.de';
  private readonly ATTRIBUTION_RVR: string = '<a href="https://geonetzwerk.metropoleruhr.de">Regionalverband Ruhr</a>';
  private readonly FORMAT_PNG: string = 'image/png';
  private readonly ZOOM_MAX: number = 21;
  private readonly ZOOM_MIN: number = 12;
  private readonly INITIAL_ZOOM: number = 14;
  private readonly NODE_STYLE: object = {
    radius: 4,
    opacity: 0.5,
    weight: 1,
    color: 'black',
    fillOpacity: 0.5,
    fillColor: 'rgb(6,176,17)'
  };
  private readonly EDGE_STYLE: object = {
    weight: 4,
    opacity: 0.5,
    color: 'rgb(219,30,42)'
  };
  private readonly MARKER_ICON = Leaflet.icon({
    iconUrl: 'assets/icon/marker-icon.png'
  });

  private popupTexts: string[];
  private map: any;
  private layerEdges: any;
  private layerNodes: any;
  private edges: Edge[];
  private watchPositionSubscription: Subscription;
  private geoJsonNodesSubscription: Subscription;
  private geoJsonEdgesSubscription: Subscription;
  private edgesSubscription: Subscription;
  private positionMarker;
  
  public selectedEdge: Edge;
  public locationFabColor = 'danger';

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private roadNetworkService: RoadNetworkService,
    private helperService: HelperService,
    private roadConditionRecordingService: RoadConditionRecordingService) {
      this.translateService.get([
        'ROAD_NETWORK.ROAD_NUMBER',
        'ROAD_NETWORK.ROAD_NAME',
        'ROAD_NETWORK.ROAD_LENGTH',
        'ROAD_NETWORK.SECTION_NUMBER',
        'ROAD_NETWORK.HOUSE_NUMBER_SECTION_RIGHT',
        'ROAD_NETWORK.HOUSE_NUMBER_SECTION_LEFT',
        'ROAD_NETWORK.FROM_NODE_KEY',
        'ROAD_NETWORK.TO_NODE_KEY',
        'ROAD_NETWORK.LOCATION'
      ]).subscribe(
        (values) => {
          console.log('Loaded values: ', values);
          this.popupTexts = values;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.watchPositionSubscription) {
      this.watchPositionSubscription.unsubscribe();
    }
    this.geoJsonNodesSubscription.unsubscribe();
    this.geoJsonEdgesSubscription.unsubscribe();
    this.edgesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initMap();
    this.initBaseLayers();

    this.geoJsonNodesSubscription = this.roadNetworkService.getGeoJsonNodes().subscribe((geoJsonNodes) => {
      this.displayNodesOnMap(geoJsonNodes);
    });

    this.geoJsonEdgesSubscription = this.roadNetworkService.getGeoJsonEdges().subscribe((geoJsonEdges) => {
      this.displayEdgesOnMap(geoJsonEdges);
    });

    this.edgesSubscription = this.roadNetworkService.getEdges().subscribe((edges) => {
      this.edges = edges;
    });

    this.initMapEvents();
  }

  /**
   * ionViewDidEnter - Fired when entering a page, after it becomes the active page.
   */
  public ionViewDidEnter(): void {
    this.applySettings();
    this.map.invalidateSize();
  }

  /**
   * applySettings - Apply the user's available settings from the Settings Page.
   */
  private applySettings(): void {
    this.addNodesLayer();
  }

  /**
   * displayNodesOnMap - Display the layer of the nodes on the leaflet map.
   *
   * @param geoJsonNodes  GeoJson Data of the network nodes
   */
  private async displayNodesOnMap(geoJsonNodes: any): Promise<void> {
    const layerNodes = new Leaflet.geoJson(geoJsonNodes, {
      pointToLayer: (feature, latlng) => {
        return Leaflet.circleMarker(latlng, this.NODE_STYLE);
      }
    });
    this.removePreviousLayer(this.layerNodes);
    this.layerNodes = layerNodes;
    this.addNodesLayer();
  }

  /**
   * addNodesLayer - Add the Layer node if enabled in the Settings.
   */
  private async addNodesLayer(): Promise<void> {
    if (this.map && this.layerNodes) {
      const isDisplayNodes = await this.settingsService.getSetting('displayNodes');

      if (isDisplayNodes && !this.map.hasLayer(this.layerNodes)) {
        this.map.addLayer(this.layerNodes);
      } else if (!isDisplayNodes && this.map.hasLayer(this.layerNodes)) {
        this.map.removeLayer(this.layerNodes);
      }
    }
  }

  /**
   * displayEdgesOnMap - Display the layer of the edges on the leaflet map.
   *
   * @param geoJsonNodes  GeoJson Data of the network edges
   */
  private displayEdgesOnMap(geoJsonEdges: any): void {
    const layerEdges = new Leaflet.geoJson(geoJsonEdges, {
      style: this.EDGE_STYLE,
      onEachFeature: function(feature, layer) { this.bindEdgeEvents(feature, layer); }.bind(this)
    });
    this.removePreviousLayer(this.layerEdges);

    this.map.addLayer(layerEdges);
    layerEdges.bringToBack();
    this.layerEdges = layerEdges;
  }

  /**
   * selectEdgeForRoadConditionRecording - Save and prepare the current edge selection for the registration of street conditions.
   *
   * @param event the event of the selected edge
   */
  private selectEdgeForRoadConditionRecording(id: number): void {
    const edge: Edge = this.getEdgeById(id);

    if (edge) {
      this.selectedEdge = edge;
    }
  }

  /**
   * clearSelectedEdge - Remove the selected edge to prevent road condition recording without localization.
   */
  private clearSelectedEdge(): void {
    this.selectedEdge = null;
  }

  /**
   * doVisualRecording - Start with the road condition recording.
   */
  public async doVisualRecording(): Promise<void> {
    try {
      const isPrepared = await this.roadConditionRecordingService.prepareRecording(this.selectedEdge);

      if (!isPrepared) {
          throw new IncompletePageDataError();
      }

      this.router.navigate(['/recording']);
    } catch (error) {
        this.helperService.handleError(error);
    }
  }

  /**
   * removePreviousLayer - If the layer already exists remove previous one from the Leaflet map.
   *
   * @param layer the layer to be removed
   */
  private removePreviousLayer(layer: any): void {
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer);
    }
  }

  /**
   * bindEdgeEvents - Add events, as well as the specific popups to the edges.
   *
   * @param feature a Property containing the edge information
   * @param layer   the layer for which the events and the popup is created
   */
  private bindEdgeEvents(feature, layer): void {
    const content = '<table class="roadNetworkPopup">'
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.LOCATION'],
      feature.properties.roadNumber + '-' + feature.properties.sectionNumber)
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.ROAD_NAME'], feature.properties.roadName)
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.ROAD_LENGTH'], feature.properties.roadLength)
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.HOUSE_NUMBER_SECTION_LEFT'],
      feature.properties.houseNumberFromLeft + '-' + feature.properties.houseNumberToLeft)
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.HOUSE_NUMBER_SECTION_RIGHT'],
      feature.properties.houseNumberFromRight + '-' + feature.properties.houseNumberToRight)
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.FROM_NODE_KEY'], feature.properties.fromNodeKey)
      + this.addPopupRow(this.popupTexts['ROAD_NETWORK.TO_NODE_KEY'], feature.properties.toNodeKey)
      + '</table>';

    layer.bindPopup(content, { maxWidth: 'auto', autoPanPadding: [65, 10] });

    layer.on(
      'popupopen', (event) => {
        event.target.setStyle({
          color: '#ffff00',
        });
        this.selectEdgeForRoadConditionRecording(feature.properties.id);
      });

    layer.on(
      'popupclose', (event) => {
        event.target.setStyle({
          color: 'rgb(219,30,42)',
        });
        this.clearSelectedEdge();
      }
    );
  }

  /**
   * addPopupRow - Add property specific table row for a popup.
   *
   * @param propertyName  the rows Property
   * @param value         the row Property value
   * @return              html of the table row
   */
  private addPopupRow(propertyName, value): string {
    return `
      <tr class='property'>
        <th scope="row">` + propertyName + `:</th>
        <td>` + value + `</td>
      </tr>`;
  }

  /**
   * initMap - Initialize the Leaflet Map.
   */
  private initMap(): void {
    this.map = Leaflet.map('map', {
      renderer: Leaflet.canvas(),
      center: this.LAT_LNG_CENTER,
      maxBounds: this.LAT_LNG_BOUNDS,
      zoomControl: true,
      zoom: this.INITIAL_ZOOM,
      maxZoom: this.ZOOM_MAX,
      minZoom: this.ZOOM_MIN
    });

    Leaflet.control.scale().addTo(this.map);
    console.log('Leaflet map initialized.');
  }

  /**
   * initMapEvents - Initialize the map events.
   */
  private initMapEvents(): void {
    // When zooming, zoom the nodes and edges as well.
    this.map.on('zoomend', async () => {
      let value;
      const currentZoom = await this.map.getZoom();
      switch (currentZoom) {
        case this.ZOOM_MIN: value = 2; break;
        case 13: value = 3; break;
        case 14: value = 4; break;
        case 15: value = 6; break;
        case 16: value = 8; break;
        case 17: value = 12; break;
        case 18: value = 20; break;
        case 19: value = 40; break;
        case 20: value = 80; break;
        case this.ZOOM_MAX: value = 160; break;
        default: value = 4; break;
      }

      if (this.layerEdges) {
        this.layerEdges.setStyle({weight: value});
      }
      if (this.layerNodes) {
        this.layerNodes.setStyle({radius: value / 2});
      }
    });
  }

  /**
   * initBaseLayers - Initialize the background maps or rather said the base layers of the Leaflet map.
   */
  private initBaseLayers(): void {
    const coloredLayer = Leaflet.tileLayer.wms(this.RVR_WMS + '/spw/spw_web?', {
      layers: 'SPW_web',
      format: this.FORMAT_PNG,
      transparent: true,
      attribution: this.ATTRIBUTION_RVR,
      maxZoom: this.ZOOM_MAX
    });
    const greyLayer = Leaflet.tileLayer.wms(this.RVR_WMS + '/spw/spw_web_grau?', {
      layers: 'SPW_web_grau',
      format: this.FORMAT_PNG,
      transparent: true,
      attribution: this.ATTRIBUTION_RVR,
      maxZoom: this.ZOOM_MAX
    });
    const aerialLayer = Leaflet.tileLayer.wms(this.RVR_WMS + '/dop/dop?', {
      layers: 'DOP',
      format: this.FORMAT_PNG,
      transparent: true,
      attribution: this.ATTRIBUTION_RVR,
      maxZoom: this.ZOOM_MAX
    });

    // Colored base map as default on startup.
    coloredLayer.addTo(this.map);

    this.translateService.get([
      'ROAD_NETWORK.COLORED_MAP',
      'ROAD_NETWORK.GREY_MAP',
      'ROAD_NETWORK.AERIAL_Map',
    ]).subscribe(
      (values) => {
        console.log('Loaded values: ', values);
        const baseLayers: any = {};
        const overlays: any = {};

        baseLayers[values['ROAD_NETWORK.COLORED_MAP']] = coloredLayer;
        baseLayers[values['ROAD_NETWORK.GREY_MAP']] = greyLayer;
        baseLayers[values['ROAD_NETWORK.AERIAL_Map']] = aerialLayer;

        Leaflet.control.layers(baseLayers, overlays).addTo(this.map);
        console.log('Leaflet layers added.');
      }
    );
  }

  /**
   * toggleWatchPosition - Toggle the location check.
   */
  public async toggleWatchPosition(): Promise<void> {
    if (!this.watchPositionSubscription || this.watchPositionSubscription.closed) {
      this.watchPosition();
    } else {
      this.unwatchPosition();
    }
  }

  /**
   * watchPosition - Observe the current position, scroll the map area to the position and place a position marker on the map.
   *
   * Note: Triggered at each position transmission by the device hardware.
   */
  private async watchPosition(): Promise<void> {
    try {
      if (!await this.roadNetworkService.locationPermissionGranted()) {
        throw new PermissionRequiredError();
      }

      if (!await this.roadNetworkService.locationActivated()) {
        throw new WatchPositionError();
      }

      this.watchPositionSubscription = this.roadNetworkService.watchPosition().subscribe((geoposition: Geoposition) => {
        try {
          if (!(geoposition && geoposition.coords)) {
            throw new WatchPositionError();
          }

          this.removePreviousLayer(this.positionMarker);
          const position = new Leaflet.LatLng(geoposition.coords.latitude, geoposition.coords.longitude);

          if (!this.LAT_LNG_BOUNDS.contains(position)) {
            throw new PositionOutOfMapError();
          }

          this.positionMarker = Leaflet.marker(position, {icon: this.MARKER_ICON});
          this.positionMarker.addTo(this.map);
          this.map.panTo(position);
          this.locationFabColor = 'success';
        } catch (error) {
          this.unwatchPosition();
          this.helperService.handleError(error);
        }
      }, error => {
        this.unwatchPosition();
        this.helperService.handleError(error);
      });
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * unwatchPosition - Finish observing the position and remove the marker from the map.
   */
  private unwatchPosition(): void {
    if (this.watchPosition) {
      this.removePreviousLayer(this.positionMarker);
      this.locationFabColor = 'danger';
      this.watchPositionSubscription.unsubscribe();
    }
  }

  private getEdgeById(id: number) {
    if (!id) {
      return null;
    }

    for (const edge of this.edges) {
      if (edge.id === id) {
        return edge;
      }
    }

    return null;
  }
}
