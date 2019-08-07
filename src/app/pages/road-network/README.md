# Road network
The Road network page is a component which acts as the central 'home' page and provides an interactive map. This interactive map uses the Leaflet Library and displays the road network of the city of Dortmund with its nodes and edges on a map.<br />
The aim of this map is the selection and localization of an edge, which is used as a basis for the visual registration of road conditions.

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

### Geonetzwerk.metropoleRuhr
Attribution to the Geometropole Ruhr for the provision of the base maps in the form of a Web Map Service (WMS).<br />
https://geonetzwerk.metropoleruhr.de/de<br />
https://daten.geoportal.ruhr/srv/ger/catalog.search#/home

### Leaflet
Leaflet is a JavaScript library for mobile-friendly interactive maps which is used within the app. 

leaflet:
 * API: https://leafletjs.com/reference-1.5.0.html
 * npm: https://www.npmjs.com/package/leaflet

#### Installation:
```typescript
npm install --save leaflet
```

#### Setup:
Make the leaflet.css styles available. Add the following line to the project styles (see angular.json).
```typescript
{
    "input": "node_modules/leaflet/dist/leaflet.css"
}
```

Make the leaflet images available. Add the following line to the project assets (see angular.json).
```typescript
{
    "glob": "**/*",
    "input": "node_modules/leaflet/dist/images",
    "output": "leaflet/"
}
```

#### Imports
```typescript
import Leaflet from 'leaflet';
```

##### Map:
The central class of the API — it is used to create a map on a page and manipulate it.<br />
https://leafletjs.com/reference-1.5.0.html#map

##### tileLayer-wms:
Used to display WMS services as tile layers on the map.<br />
https://leafletjs.com/reference-1.5.0.html#tilelayer-wms<br />
https://leafletjs.com/reference-1.5.0.html#tilelayer

##### GeoJSON:
Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map.<br />
https://leafletjs.com/reference-1.5.0.html#geojson

##### canvas:
Allows vector layers to be displayed with \<canvas\>.<br />
https://leafletjs.com/reference-1.5.0.html#canvas

##### LatLng:
Represents a geographical point with a certain latitude and longitude.<br />
https://leafletjs.com/reference-1.5.0.html#latlng

##### LatLngBounds:
Represents a rectangular geographical area on a map.<br />
https://leafletjs.com/reference-1.5.0.html#latlngbounds

##### Control.Scale:
A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.<br />
https://leafletjs.com/reference-1.1.0.html#control-scale

##### Icon:
Represents an icon to provide when creating a marker.<br />
https://leafletjs.com/reference-1.5.0.html#icon

### RoadNetworkService
A service that serves the purpose of delegating any interactions with 'Nodes' or 'Edges', as well as 'Leaflet' and exchanging the corresponding information between classes.

#### Imports
```typescript
import { RoadNetworkService } from './../../services/road-network/road-network.service';
```

#### Methods
Observe the GeoJSON nodes for any changes:
```typescript
RoadNetworkService.getGeoJsonNodes(): Observable<any>
```

Observe the GeoJSON edges for any changes:
```typescript
RoadNetworkService.getGeoJsonEdges(): Observable<any>
```

Observe the nodes for any changes:
```typescript
RoadNetworkService.getEdges(): Observable<Edge[]>
```

Check if the location permissions are granted:
```typescript
(method) RoadNetworkService.locationPermissionGranted(): Promise<boolean>
```

Checks whether the user has switched on the location check of the device:
```typescript
RoadNetworkService.locationActivated(): Promise<boolean>
```

Watch the current device's position.:
```typescript
RoadNetworkService.watchPosition(): Observable<Geoposition>
```

### HelperService
A service that provides general helper methods which are widely used.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { HelperService } from './../../services/helper/helper.service';
```

Error handling by displaying an error message:
```typescript
HelperService.handleError(error: any): void
```

### RoadConditionRecordingService
A service used to provide the necessary data for road condition monitoring, to ensure data exchange between road condition monitoring classes and to handle the final data storage.

#### Imports
```typescript
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
```

#### Methods
Prepare the visual recording by having the service set and fetch all necessary data:
```typescript
RoadConditionRecordingService.prepareRecording(edge: Edge): Promise<boolean>
```

### SettingsService
A service that stores and provides all user-specific settings on the current device.

#### Imports
```typescript
import { SettingsService } from './../../services/settings/settings.service';
```

#### Methods
Get a specific setting using the key:
```typescript
SettingsService.getSetting(key: string): Promise<any>
```
