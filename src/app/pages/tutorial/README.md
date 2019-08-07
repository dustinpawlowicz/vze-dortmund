# Tutorial
The Tutorial page is a slide component which allows the user to wipe through various tutorial steps.<br />
This allows the user to get an insight into the functionality of the application. If this is not desired, the steps can be skipped.

## Documentation
Documentation of external functionalities within the component.

**Notice:** The documentation within the corresponding 'page.ts' is to be used for the component's own methods.

### Slides API
https://ionicframework.com/docs/api/slides

#### Imports
```typescript
import { IonSlides } from '@ionic/angular';
```

#### Properties
Get whether or not the current slide is the last slide:
```typescript
Components.IonSlides['isEnd']: () => Promise<boolean>
```

#### Events
ionSlidesDidLoad:   Emitted after Swiper initialization
ionSlideDidChange: 	Emitted after the active slide has changed.