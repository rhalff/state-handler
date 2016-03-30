[![NPM](https://nodei.co/npm/state-handler.png)](https://nodei.co/npm/state-handler/)
[![Build Status](https://travis-ci.org/rhalff/state-handler.png)](https://travis-ci.org/rhalff/state-handler)

# State Handler

Trigger execution chains based on the state of injected parameters.

If a function within the chain returns `false` the execution chain stops and
the next function will not be called.

### Install
```bash
npm install state-handler --save
```

### example

```js
const StateHandler = require('state-handler')

// some example state
const state = {
  items: [],
  complete: false
}

const sh = StateHandler (state)

sh.on([
  (s) => s.items.length === 2,
  (s) => s.items = [],
  (s) => {s.complete = true}, // {} prevent return of false
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

StateHandler accepts an arbitrary length of parameters, e.g.:
```js
const sh = StateHandler (state, dispatch)
sh.on(
  (s) => s.completed === true,
  (s, dispatch) => dispatch(s)
)

// modify state

sh.exec()
```

### Download

  * Development version: https://npmcdn.com/state-handler/dist/exec.js
  * Minified version: https://npmcdn.com/state-handler/dist/exec.min.js
