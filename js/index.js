import Canvas from './canvas.js'
import Snake from './snake.js'
import { KEYS } from './utils.js'

let displacement = 0
let snakeActionDirection

function animate () {
  window.requestAnimationFrame(animate)
  Canvas.clearCanvas()

  if (displacement >= Snake.STEP_SIZE && snakeActionDirection) {
    snake.update(snakeActionDirection)
    displacement = 0
    snakeActionDirection = false
  }

  if (displacement >= Snake.STEP_SIZE && !snakeActionDirection) {
    displacement = 0
  }

  snake.update(Snake.ACTION_DIRECTIONS.STRAIGHT)
  displacement += Snake.DISPLACEMENT
}

const snake = new Snake()
animate()

window.addEventListener('keydown', (event) => {
  if (event.keyCode === KEYS.LEFT) {
    snakeActionDirection = Snake.ACTION_DIRECTIONS.LEFT
  }
  if (event.keyCode === KEYS.RIGHT) {
    snakeActionDirection = Snake.ACTION_DIRECTIONS.RIGHT
  }
})
