# Edit User
The Edit User page is a component that provides the admin with a form to edit or delete existing users.

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

Execution of a edit user attempt:
```typescript
UserService.edit(data: any): Observable<any>
```

Execution of a delete user attempt:
```typescript
UserService.delete(data: any): Observable<any>
```

Remove the current user and navigate to the login page:
```typescript
UserService.logout(): void
```

Fetch the existing user roles:
```typescript
UserService.fetchRoles(): Observable<any>
```

Fetch the existing users:
```typescript
UserService.fetchUsers(data: any): Observable<any>
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

Convert a date string to Date:
```typescript
HelperService.convertDateString(dateString: string): Date
```

Convert a date to ISO format:
```typescript
HelperService.convertDate(date: Date): string
```

### Location
A service that applications can use to interact with a browser's URL.<br />
https://angular.io/api/common/Location

#### Imports
```typescript
import { Location } from '@angular/common';
```

Navigates back in the platform's history:
```typescript
Location.back(): void
```

### ion-back-button
https://ionicframework.com/docs/api/back-button

### ion-datetime
https://ionicframework.com/docs/api/datetime
