# Authentication Guard

## Documentation
Documentation of external functionalities within the guard.

**Notice:** The documentation within the corresponding 'guard.ts' is to be used for the guard's own methods.

### CanActivate
Interface that a class can implement to be a guard deciding if a route can be activated<br />
https://angular.io/api/router/CanActivate

#### Imports
```typescript
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
```

#### Methods
Decide whether a route can be activated or not:
```typescript
AuthenticationGuard.canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
```

#### Parameter
ActivatedRouteSnapshot - https://angular.io/api/router/ActivatedRouteSnapshot
 * Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.

RouterStateSnapshot - https://angular.io/api/router/RouterStateSnapshot
 * Represents the state of the router at a moment in time.
 