# Road Network Service
A service used to delegate interactions within the registration of road conditions and to exchange the corresponding information between classes.

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
GET-Request to the 'http-api-vze-dortmund' HTTP API:
```typescript
ApiService.get(endpoint: string, options?: any): Observable<any>
```

### BehaviorSubject
A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.<br />
https://rxjs-dev.firebaseapp.com/api/index/class/BehaviorSubject

### camera
Take a photo or capture video.<br />

cordova-plugin-camera:
 * API: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html
 * npm: https://www.npmjs.com/package/cordova-plugin-camera

@ionic-native/camera:
 * API: https://ionicframework.com/docs/native/camera
 * npm: https://www.npmjs.com/package/@ionic-native/camera

#### Installation:
```typescript
ionic cordova plugin add cordova-plugin-camera
npm install @ionic-native/camera --save
```
In addition, 'Camera' must be added as a provider in app.module.

#### Imports
```typescript
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
```

#### Methods
Watch the current device's position. Clear the watch by unsubscribing from Observable changes:
```typescript
watchPosition(options?: GeolocationOptions): Observable<Geoposition>
```

### File
This plugin implements a File API allowing read/write access to files residing on the device.<br />

cordova-plugin-file:
 * API: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/
 * npm: https://www.npmjs.com/package/cordova-plugin-file

@ionic-native/file:
 * API: https://ionicframework.com/docs/native/file
 * npm: https://www.npmjs.com/package/@ionic-native/file

#### Installation:
```typescript
ionic cordova plugin add cordova-plugin-file
npm install @ionic-native/file --save
```
In addition, 'File' must be added as a provider in app.module.

#### Imports
```typescript
import { File } from '@ionic-native/file/ngx';
```

#### Methods
Read file and return data as a base64 encoded data url. A data url is of the form: data: [<mediatype>][;base64],<data>:
```typescript
File.readAsDataURL(path: string, file: string): Promise<string>
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

### UserService
A service that serves the purpose of delegating any interactions with a 'User' and exchanging the corresponding information between classes.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { UserService } from './../../services/user/user.service';
```

#### Methods
Returns the user property:
```typescript
UserService.getUserProperty(): UserProperty
```

Returns the user id:
```typescript
UserService.getUserId(): number
```

Returns the username:
```typescript
UserService.getUsername(): string
```

### ExportService
A service used to export user data as a file.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { ExportService } from './../export/export.service';
```

#### Methods
Exports the transferred data as a file:
```typescript
ExportService.export(json: any[], filename: string, exportOption: ExportOption): void
```

### Storage
Storage is an easy way to store key/value pairs and JSON objects.<br />
https://ionicframework.com/docs/building/storage

#### Imports
```typescript
import { Storage } from '@ionic/storage';
```

#### Methods
Set the value for the given key:
```typescript
Storage.set(key: string, value: any): Promise<any>
```
