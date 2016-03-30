const test = require('tape')
const StateHandler = require('./')

const state = {
  items: []
}

test('Can run an execution chain', function (t) {
  const sh = StateHandler(state)
  sh.on(
    (s) => s.items.length === 2,
    (s) => t.deepEqual(s.items, [1, 2]),
    (s) => s.items = [],
    (s) => t.end()
  )
  state.items.push(1)
  state.items.push(2)
  sh.exec()
})

test('Can run an execution chain (chain as array)', function (t) {
  const sh = StateHandler(state)
  sh.on([
    (s) => s.items.length === 2,
    (s) => t.deepEqual(s.items, [1, 2]),
    (s) => s.items = [],
    (s) => t.end()
  ])
  state.items.push(1)
  state.items.push(2)
  sh.exec()
})

test('Can turn off execution chain', function (t) {
  const sh = StateHandler(state)
  const off = sh.on((s) => t.fail('should not be called'))
  off()
  sh.exec()
  t.end()
})

test('Can handle multiple urguments', function (t) {
  const sh = StateHandler(state, (s) => {
    t.deepEqual(s, {length: 2})
    t.end()
  })
  sh.on(
    (s, dispatch) => dispatch({length: s.items.length})
  )
  state.items.push(1)
  state.items.push(2)
  sh.exec()
})
