[![NPM](https://nodei.co/npm/object-exec.png)](https://nodei.co/npm/object-exec/)
[![Build Status](https://travis-ci.org/rhalff/object-exec.png)](https://travis-ci.org/rhalff/object-exec)

# Object Exec

Provides a way to trigger execution chains to be executed based
on the state of injected parameters.


### Install
```bash
npm install object-exec --save
```

### example

```js
const ObjectExec = require('object-exec')

const state = {
  items: []
}

const oe = ObjectExec(state)

oe.on([
  (s) => s.items.length === 2,
  (s) => s.items = [],
  (s) => alert(JSON.stringify(s.items))
])

state.items.push(1)
oe.exec() // NOP

state.items.push(2)
oe.exec() // exec

off()

state.items.push(3)
state.items.push(4)

oe.exec() // NOP
```

### Download

  * Development version: https://npmcdn.com/object-exec/dist/exec.js
  * Minified version: https://npmcdn.com/object-exec/dist/exec.min.js
