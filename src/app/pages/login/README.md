# Log In
The Login page is a component that is called when the app is started and provides the user with a login form. The login form is used to authenticate the
user and to prevent unauthenticated access.

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
Execution of the login request with reply notification of the respective success:
```typescript
UserService.login(data: any): Observable<any>
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

Displays a error message:
```typescript
HelperService.displayErrorMessage(key: string, params?: object): void
```

Error handling by displaying an error message:
```typescript
HelperService.handleError(error: any): void
```

### RoadNetworkService
A service that serves the purpose of delegating any interactions with 'Nodes' or 'Edges', as well as 'Leaflet' and exchanging the corresponding information between classes.<br />
For further details please navigate to the respective service.

#### Imports
```typescript
import { RoadNetworkService } from './../../services/road-network/road-network.service';
```

Fetch the existing road network nodes:
```typescript
RoadNetworkService.fetchNodes(data: any): Observable<any>
```

Fetch the existing road network edges:
```typescript
RoadNetworkService.fetchEdges(data: any): Observable<any>
```
