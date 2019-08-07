# Characteristics
The Characteristics page is a component which provides an form to enter the order positions for a specific registration of road conditions.<br />
It is the second step in the visual road condition registration process.

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

### RoadConditionRecordingService
A service used to provide the necessary data for road condition monitoring, to ensure data exchange between road condition monitoring classes and to handle the final data storage.

#### Imports
```typescript
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
```

#### Methods
Set the passed order positions and complete the characteristics:
```typescript
RoadConditionRecordingService.completeCharacteristics(orderPositions: OrderPositions): void
```

Cancel the process of registering a road condition:
```typescript
RoadConditionRecordingService.cancelRecording(): void
```

### ion-item-sliding
https://ionicframework.com/docs/api/item-sliding<br />
https://ionicframework.com/docs/api/item-option<br />
https://ionicframework.com/docs/api/item-options
