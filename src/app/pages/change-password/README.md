# Change Password
The Change Password page is a component that provides the user with a form to change the current password.

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

### UserService
A service that serves the purpose of delegating any interactions with a 'User' and exchanging the corresponding information between classes.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { UserService } from './../../services/user/user.service';
```

#### Methods
Execution of a changePassword attempt:
```typescript
UserService.changePassword(data: any): Observable<any>
```

### HelperService
A service that provides general helper methods which are widely used.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { HelperService } from './../../services/helper/helper.service';
```

Check whether the http request was successful or not:
```typescript
HelperService.isSuccess(response: any): boolean
```

Displays a success message:
```typescript
HelperService.displaySuccessMessage(key: string, params?: object): void
```

Error handling by displaying an error message:
```typescript
HelperService.handleError(error: any): void
```

### ion-back-button
https://ionicframework.com/docs/api/back-button
