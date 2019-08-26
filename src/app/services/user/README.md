# User Service
A service that serves the purpose of delegating any interactions with a 'User' and exchanging the corresponding information between classes.

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

GET-Request to the 'http-api-vze-dortmund' HTTP API:
```typescript
ApiService.get(endpoint: string, options?: any): Observable<any>
```

### SettingsService
A service that stores and provides all user-specific settings on the current device.

#### Imports
```typescript
import { SettingsService } from './../../services/settings/settings.service';
```

#### Methods
Apply the general settings:
```typescript
SettingsService.applyGeneralSettings(): void
```