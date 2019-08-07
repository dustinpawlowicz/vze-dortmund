# Basic data
The Basic data page is a component which provides an form to enter the basic data for a specific registration of road conditions.<br />
It is the first step in the visual road condition registration process.

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

Convert a date to ISO format:
```typescript
HelperService.convertDate(date: Date): string
```

### RoadConditionRecordingService
A service used to provide the necessary data for road condition monitoring, to ensure data exchange between road condition monitoring classes and to handle the final data storage.

#### Imports
```typescript
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
```

#### Methods
Returns the priorities:
```typescript
RoadConditionRecordingService.getPriorities(): Property[]
```

Returns the departements:
```typescript
RoadConditionRecordingService.getDepartements(): Property[]
```

Returns the surfaces:
```typescript
RoadConditionRecordingService.getSurfaces(): Property[]
```

Specifies the smallest house number of the recording edge:
```typescript
RoadConditionRecordingService.getMinHouseNumber(): number
```

Specifies the largest house number of the recording edge:
```typescript
RoadConditionRecordingService.getMaxHouseNumber(): number
```

Returns the location of the recording edge:
```typescript
RoadConditionRecordingService.getLocation(): string
```

Returns the road name of the recording edge:
```typescript
RoadConditionRecordingService.getRoadName(): string
```

Returns the house number section left of the recording edge:
```typescript
RoadConditionRecordingService.getHouseNumberSectionLeft(): string
```

Returns the house number section right of the recording edge:
```typescript
RoadConditionRecordingService.getHouseNumberSectionRight(): string
```

Set and complete the passed basic data:
```typescript
RoadConditionRecordingService.completeBasicData(data: any): void
```

Cancel the process of registering a road condition:
```typescript
RoadConditionRecordingService.cancelRecording(): void
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
