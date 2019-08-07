# Standard Order Position Modal
A modal (dialog) which provides the user with a form to enter the characteristic type "StandardOrderPosition".

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

### ModalController
Modal controllers programmatically control the modal component<br />
https://ionicframework.com/docs/api/modal-controller<br />
https://ionicframework.com/docs/api/modal

#### Imports
```typescript
import { ModalController } from '@ionic/angular';
```

#### Methods
Dismiss the open modal overlay:
```typescript
OverlayBaseController<ModalOptions<ComponentRef>, HTMLIonModalElement>.dismiss(data?: any, role?: string, id?: string): Promise<boolean>
```

### RoadConditionRecordingService
A service used to provide the necessary data for road condition monitoring, to ensure data exchange between road condition monitoring classes and to handle the final data storage.

#### Imports
```typescript
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
```

#### Methods
An image is created by accessing the device camera:
```typescript
RoadConditionRecordingService.addPicture(): Promise<Picture>
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
