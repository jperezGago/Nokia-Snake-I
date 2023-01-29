import Canvas from './canvas.js'
import Snake from './snake.js'
import { KEYS } from './utils.js'

let snakeDisplacement = 0
let snakeActionDirection

function animate (snakeVelocity) {
  window.requestAnimationFrame(animate)
  Canvas.clearCanvas()

  if (snakeDisplacement >= Snake.STEP_SIZE && snakeActionDirection) {
    snake.update(snakeActionDirection)
    snakeDisplacement = 0
    snakeActionDirection = false
  }

  if (snakeDisplacement >= Snake.STEP_SIZE && !snakeActionDirection) {
    snakeDisplacement = 0
  }

  snake.update(Snake.ACTION_DIRECTIONS.STRAIGHT)
  snakeDisplacement += snakeVelocity
}

const snake = new Snake()

animate(snake.velocity)

window.addEventListener('keydown', (event) => {
  if (event.keyCode === KEYS.LEFT) {
    snakeActionDirection = Snake.ACTION_DIRECTIONS.LEFT
  }
  if (event.keyCode === KEYS.RIGHT) {
    snakeActionDirection = Snake.ACTION_DIRECTIONS.RIGHT
  }
})
