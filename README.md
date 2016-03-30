[![NPM](https://nodei.co/npm/state-handler.png)](https://nodei.co/npm/state-handler/)
[![Build Status](https://travis-ci.org/rhalff/state-handler.png)](https://travis-ci.org/rhalff/state-handler)

# State Handler

Trigger execution chains based on the state of injected parameters.

### Install
```bash
npm install state-handler --save
```

### example

```js
const StateHandler = require('state-handler')

const state = {
  items: []
}

const sh = StateHandler (state)

sh.on([
  (s) => s.items.length === 2,
  (s) => s.items = [],
  (s) => alert(JSON.stringify(s.items))
])

state.items.push(1)
sh.exec() // NOP

state.items.push(2)
sh.exec() // exec

off()

state.items.push(3)
state.items.push(4)

sh.exec() // NOP
```

### Download

  * Development version: https://npmcdn.com/state-handler/dist/exec.js
  * Minified version: https://npmcdn.com/state-handler/dist/exec.min.js
