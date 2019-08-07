# Toast Service
A Service for displaying notifications in the frontend.

## Documentation
Documentation of external functionalities within the service.

**Notice:** The documentation within the corresponding 'service.ts' is to be used for the service's own methods.

### ToastController
Creates Toast components.<br />
https://ionicframework.com/docs/api/toast-controller<br />
https://ionicframework.com/docs/api/toast

#### Imports
```typescript
import { ToastController } from '@ionic/angular';
```

#### Methods
Present the toast overlay after it has been created:
```typescript
present() => Promise<void>
```

Dismiss the open toast overlay:
```typescript
dismiss(data?: any, role?: string | undefined, id?: string | undefined) => Promise<boolean>
```

Returns a promise that resolves when the toast did dismiss:
```typescript
onDidDismiss() => Promise<OverlayEventDetail<any>>
```
