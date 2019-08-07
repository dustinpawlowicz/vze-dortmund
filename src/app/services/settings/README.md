# Settings Service
A service that stores and provides all user-specific settings on the current device.

## Documentation
Documentation of external functionalities within the service.

**Notice:** The documentation within the corresponding 'service.ts' is to be used for the service's own methods.

### Storage
Storage is an easy way to store key/value pairs and JSON objects.<br />
https://ionicframework.com/docs/building/storage

#### Imports
```typescript
import { Storage } from '@ionic/storage';
```

#### Methods
Get the value associated with the given key:
```typescript
Storage.get(key: string): Promise<any>
```

Set the value for the given key:
```typescript
Storage.set(key: string, value: any): Promise<any>
```
