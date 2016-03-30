const StateHandler = require('state-handler')

const state = {
  items: []
}

const sh = StateHandler(state)

const off = sh.on(
  (s) => s.items.length === 2,
  (s) => console.log(JSON.stringify(s.items)),
  (s) => s.items = []
)

state.items.push(1)
sh.exec() // NOP

state.items.push(2)
sh.exec() // exec

off()

state.items.push(3)
state.items.push(4)

sh.exec() // NOP
