# Helper Service
A service that provides general helper methods which are widely used.

## Documentation
Documentation of external functionalities within the service.

**Notice:** The documentation within the corresponding 'service.ts' is to be used for the service's own methods.

### ToastService
A Service for displaying notifications in the frontend.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { ToastService } from './../../services/toast/toast.service';
```

Display of a success message:
```typescript
ToastService.presentSuccessToast(msg: string): Promise<void>
```

Display of an error message, which requires further action by the user:
```typescript
ToastService.presentErrorToast(msg: string): Promise<void>
```
