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

  setSnakeControls (snake) {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === this.keysCode.left) snake.setDirection(Controls.controlDirections.left)
      if (event.keyCode === this.keysCode.right) snake.setDirection(Controls.controlDirections.rigth)
    })
  }
}
