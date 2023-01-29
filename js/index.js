import Canvas from './canvas.js'
import Snake from './snake.js'
import { KEYS } from './utils.js'

function animate () {
  window.requestAnimationFrame(animate)
  Canvas.clearCanvas()
  snake.update()
}

function addKeysListener () {
  window.addEventListener('keydown', (event) => {
    if (event.keyCode === KEYS.LEFT) {
      snake.direction = Snake.ACTION_DIRECTIONS.LEFT
    }
    if (event.keyCode === KEYS.RIGHT) {
      snake.direction = Snake.ACTION_DIRECTIONS.RIGHT
    }
  })
}

const snake = new Snake()
animate()
addKeysListener()
