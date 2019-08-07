# Comments
The Comments page is a component which provides an form to enter the optional comments for a specific registration of road conditions.<br />
It is the third and last step in the visual road condition registration process.

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

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

Displays a success message:
```typescript
HelperService.displaySuccessMessage(key: string, params?: object): void
```

### RoadConditionRecordingService
A service used to provide the necessary data for road condition monitoring, to ensure data exchange between road condition monitoring classes and to handle the final data storage.

#### Imports
```typescript
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
```

#### Methods
Returns the comments:
```typescript
RoadConditionRecordingService.getComments(): Comment[]
```

Completes the road condition registration and stores the new road condition in the ionic storage:
```typescript
RoadConditionRecordingService.completeComments(comments: string[]): Promise<boolean>
```

### ion-checkbox
https://ionicframework.com/docs/api/checkbox

### ion-item-sliding
https://ionicframework.com/docs/api/item-sliding<br />
https://ionicframework.com/docs/api/item-option<br />
https://ionicframework.com/docs/api/item-options
