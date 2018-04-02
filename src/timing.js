const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

const every = (period, actions) => {
  let afterLast
  const p = new Promise((resolve) => afterLast = resolve)

  const newActions = [
    ...actions,
    () => afterLast()
  ]

  const inner = (actions) => {
    if (actions.length > 0) {
      actions[0]()
      wait(period).then(() => {
        inner(actions.slice(1))
      })
    }
  }

  return () => {
    inner(newActions)
    return p
  }
}

export default every
