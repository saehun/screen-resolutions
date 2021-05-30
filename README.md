# ScreenResolutions

Get screen resolutions

```ts
import { resolutions } from 'screen-resolutions'
// const { resolutions } = require('screen-resolutions');

(async () => {
  console.log(await resolutions());

  // [
  //   { w: 3072, h: 1920, monitor: 'Retina' },
  //   { w: 2560, h: 1080, monitor: '(UW-UXGA - Ultra Wide - Ultra Extended Graphics Array)' }
  // ]

});

```
