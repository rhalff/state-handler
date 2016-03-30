const test = require('tape')
const ObjectExec = require('./')

const obj = {
}

const expected = [
  ['input', 'in1', 'i1'],
  ['input', 'in2', 'i2'],
  ['output', 'out1', 'o1'],
  ['output', 'out2', 'o2']
]

const state = {
  items: [],
  completed: false
}

/*
state.items.push(1)
oe.exec()
state.items.push(2)
oe.exec()
// off()
state.items.push(3)
state.items.push(4)
oe.exec()
*/

test('Can run an execution chain', function (t) {
  const oe = ObjectExec(state)
  oe.on(
    (s) => s.items.length === 2,
    (s) => t.deepEqual(s.items, [1, 2]),
    (s) => s.items = [],
    (s) => t.end()
  )
  state.items.push(1)
  state.items.push(2)
  oe.exec()
})

test('Can run an execution chain (chain as array)', function (t) {
  const oe = ObjectExec(state)
  oe.on([
    (s) => s.items.length === 2,
    (s) => t.deepEqual(s.items, [1, 2]),
    (s) => s.items = [],
    (s) => t.end()
  ])
  state.items.push(1)
  state.items.push(2)
  oe.exec()
})

test('Can turn off execution chain', function (t) {
  const oe = ObjectExec(state)
  const off = oe.on((s) => t.fail('should not be called'))
  off()
  oe.exec()
  t.end()
})

test('Can handle multiple urguments', function (t) {
  const oe = ObjectExec(state, (s) => {
    t.deepEqual(s, {length: 2})
    t.end()
  })
  oe.on(
    (s, dispatch) => dispatch({length: s.items.length})
  )
  state.items.push(1)
  state.items.push(2)
  oe.exec()
})
