# Profile
The Profile page is a component that provides the user with user information and account functionality. An admin will also have access to further functions to edit users.

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
Remove the current user and navigate to the login page:
```typescript
UserService.logout(): void
```

Check if the user has the admin role:
```typescript
UserService.isAdmin(): boolean
```
