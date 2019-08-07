# Settings
The Settings page is a component that is provides the user with a settings form. The settings form is used to set and apply the settings in the app.

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

### SettingsService
A service that stores and provides all user-specific settings on the current device.

#### Imports
```typescript
import { SettingsService } from './../../services/settings/settings.service';
```

#### Methods
Get all user-specific settings:
```typescript
SettingsService.getAllSettings(): Promise<any>
```

Merge the saved settings with the new settings and save them on the device
```typescript
SettingsService.merge(settings: any): any
```
