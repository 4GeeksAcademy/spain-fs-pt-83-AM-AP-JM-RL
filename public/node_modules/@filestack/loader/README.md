<p align="center">
  <a href="https://www.filestack.com"><img src="https://static.filestackapi.com/filestack-js.svg?refresh" align="center" width="250" /></a>  
</p>
<p align="center">
  <strong>Dependency free js async script loader for browsers maintained by @Filestack</strong>
</p>

## Installation

```
npm install @filestack/loader
```

## Usage

### Loading JavaScript Modules

To load async modules just call method loadModule

```js
import { loadModule } from '@filestack/loader';

loadModule('module-id', 'url/to/b.js').then((b) => {
  b.helloWorld();
});
```

```js
You can register some metadata after module will be loaded with register module

import { registerModule } from '@filestack/loader';

const api = {
  helloWorld() {
    console.log('Hello world!');
  },
};

// Module need to "tell" the loader that it's loaded and ready.
registerModule('module-id', api, { version: 123 });
```

### Loading CSS

```js
import { loadCss } from '@filestack/loader';

loadCss('url/to/style.css').then(() => {
  console.log('Style loaded!');
});
```

# Development

## Setup

```
npm install
```

## Testing

### Unit

```
npm test
```
This command opens in the browser semi-manual tests. Those tests don't have watch, so you need to refire the command with each change.
