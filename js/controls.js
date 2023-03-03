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

  static controlDirections = {
    left: Symbol('left'),
    rigth: Symbol('rigth')
  }

  setStartControl (startGame) {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === this.keysCode.enter) startGame()
    })
  }

  setSnakeControls (snakeSetDirection) {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === this.keysCode.left) snakeSetDirection(Controls.controlDirections.left)
      if (event.keyCode === this.keysCode.right) snakeSetDirection(Controls.controlDirections.rigth)
    })
  }
}
