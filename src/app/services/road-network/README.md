# Road Network Service
A service that serves the purpose of delegating any interactions with 'Nodes' or 'Edges', as well as 'Leaflet' and exchanging the corresponding information between classes.

## Documentation
Documentation of external functionalities within the service.

**Notice:** The documentation within the corresponding 'service.ts' is to be used for the service's own methods.

### ApiService
A service that performs any requests to the 'http-api-vze-dortmund' HTTP API.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { ApiService } from './../api/api.service';
```

#### Methods
POST-Request to the 'http-api-vze-dortmund' HTTP API:
```typescript
ApiService.post(endpoint: string, body: any, options?: any): Observable<any>
```

### BehaviorSubject
A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.<br />
https://rxjs-dev.firebaseapp.com/api/index/class/BehaviorSubject

### GeoJSON
GeoJSON is a format for encoding a variety of geographic data structures.<br />
https://geojson.org/

### Geolocation
This plugin provides information about the device's location, such as latitude and longitude.

cordova-plugin-geolocation:
 * API: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/
 * npm: https://www.npmjs.com/package/cordova-plugin-geolocation

@ionic-native/geolocation:
 * API: https://ionicframework.com/docs/native/geolocation
 * npm: https://www.npmjs.com/package/@ionic-native/geolocation

#### Installation:
```typescript
ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation --save
```
In addition, 'Geolocation' must be added as a provider in app.module.

#### Imports
```typescript
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
```

#### Methods
Watch the current device's position. Clear the watch by unsubscribing from Observable changes:
```typescript
watchPosition(options?: GeolocationOptions): Observable<Geoposition>
```

### AndroidPermissions
This plugin is designed to support Android new permissions checking mechanism.<br />
https://developer.android.com/reference/android/Manifest.permission.html

cordova-plugin-geolocation:
 * API: https://cordova.apache.org/docs/en/latest/guide/platforms/android/plugin.html#android-permissions
 * npm: https://www.npmjs.com/package/cordova-plugin-android-permissions

@ionic-native/android-permissions:
 * API: https://ionicframework.com/docs/native/android-permissions
 * npm: https://www.npmjs.com/package/@ionic-native/android-permissions

#### Installation:
```typescript
ionic cordova plugin add cordova-plugin-android-permissions
npm install @ionic-native/android-permissions --save
```
In addition, 'AndroidPermissions' must be added as a provider in app.module.

#### Imports
```typescript
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
```

#### Methods
Check permission:
```typescript
AndroidPermissions.checkPermission(permission: string): Promise<any>
```

Request permission:
```typescript
AndroidPermissions.requestPermission(permission: string): Promise<any>
```

### Location Accuracy
This Cordova/Phonegap plugin for Android and iOS to request enabling/changing of Location Services by triggering a native dialog from within the app, avoiding the need for the user to leave your app to change location settings manually.<br />

cordova-plugin-geolocation:
 * API: https://github.com/dpa99c/cordova-plugin-request-location-accuracyplugin.html#android-permissions
 * npm: https://www.npmjs.com/package/cordova-plugin-android-permissions

@ionic-native/location-accuracy:
 * API: https://ionicframework.com/docs/native/location-accuracy
 * npm: https://www.npmjs.com/package/@ionic-native/location-accuracy

#### Installation:
```typescript
ionic cordova plugin add cordova-plugin-request-location-accuracy
npm install @ionic-native/location-accuracy --save
```
In addition, 'LocationAccuracy' must be added as a provider in app.module.

#### Imports
```typescript
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
```

#### Methods
Indicates if you can request accurate location:
```typescript
LocationAccuracy.canRequest(): Promise<boolean>
```

Requests accurate location:
```typescript
LocationAccuracy.request(accuracy: number): Promise<any>
```
