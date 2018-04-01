const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

const every = (period, actions) => {
  return {
    start: () => {
      if (actions.length > 0) {
        actions[0]()
        wait(period).then(() => {
          every(period, actions.slice(1)).start()
        })
      }
    }
  }
}

export default every
