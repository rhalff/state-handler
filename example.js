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
