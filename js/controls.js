import { DIRECTIONS } from './utils.js'

export default class Controls {
  constructor () {
    this.keysCode = {
      space: 32,
      enter: 13,
      left: 37,
      right: 39,
      up: 38,
      down: 40
    }
  }

  setStartControl (startGame) {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === this.keysCode.enter) startGame()
    })
  }

  setSnakeControls (snakeSetDirection) {
    const keysCodeToDiretion = {
      [this.keysCode.up]: DIRECTIONS.NORTH,
      [this.keysCode.down]: DIRECTIONS.SOUTH,
      [this.keysCode.left]: DIRECTIONS.WEST,
      [this.keysCode.right]: DIRECTIONS.EAST
    }

    window.addEventListener('keydown', (event) => {
      const direction = keysCodeToDiretion[event.keyCode]
      snakeSetDirection(direction)
    })
  }
}
