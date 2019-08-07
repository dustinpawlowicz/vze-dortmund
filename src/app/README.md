# Root Component
This is the first component that is loaded by the app.

## Documentation
General documentation of functionalities, which are distributed over the entire app.

**Notice:** Functionalities that are only used in individual components are separately documented in the component's own README files.

### Project Structure
General project structure.<br />
https://ionicframework.com/docs/building/scaffolding#project-structure

### Angular Router
Routing and Navigation within the App.<br />
https://ionicframework.com/docs/navigation/angular<br />
https://angular.io/guide/router

#### Imports
```typescript
import { Router } from '@angular/router';
```

#### Methods
Navigate based on the provided array of commands and a starting point (absolute if not provided):
```typescript
Router.navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>
```

### Internationalization (i18n)
The internationalization (i18n) library for Angular 'ngx-translate/core' in use with
the 'ngx-translate/http-loader' to load translations using http are used within the app.

ngx-translate/core:
 * npm:    https://www.npmjs.com/package/@ngx-translate/core

ngx-translate/http-loader:
 * npm:    https://www.npmjs.com/package/@ngx-translate/http-loader

#### Installation:
```typescript
npm install --save @ngx-translate/core @ngx-translate/http-loader
```

#### Imports
```typescript
// app.module.ts
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// app.component.ts and all pages that get translations
import {TranslateService} from '@ngx-translate/core';
```

##### Functions
Load translations from '/assets/i18n/[lang].json':
```typescript
function createTranslateLoader(http: HttpClient): TranslateHttpLoader
``` 
Supported languages:

| Language  | File 
| ------------- | ------------- |
| German (default) | de.json  |
| English  | en.json  |
    
##### Methods
This language will be used as a fallback when a translation isn't found in the current language:
```typescript
TranslateService.setDefaultLang(lang: string): void
``` 

Returns the language code name from the browser, e.g. 'de':
```typescript
TranslateService.getBrowserLang(): string
``` 
    
The lang to use, if the lang isn't available, it will use the current loader to get them:
```typescript
TranslateService.use(lang: string): Observable<any>
``` 

Gets the translated value of a key (or an array of keys):
```typescript
 TranslateService.get(key: string | string[], interpolateParams?: Object): Observable<any>
 ```

### Ionic Storage
A simple key-value Storage module for Ionic apps.

ngx-translate/core:
 * API: https://ionicframework.com/docs/building/storage   
 * npm: https://www.npmjs.com/package/@ionic/storage

#### Installation:
```typescript
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
```

#### Imports
```typescript
// app.module.ts
import { IonicStorageModule } from '@ionic/storage';

// All pages accessing the storage 
import { Storage } from '@ionic/storage';
```

### ionic cordova resources
Automatically create icon and splash screen resources.

ngx-translate/core:
 * API: https://ionicframework.com/docs/cli/commands/cordova-resources
 * npm: https://www.npmjs.com/package/cordova-res

#### Installation:
```typescript
ionic cordova resources
npm install -g cordova-res --save
```
