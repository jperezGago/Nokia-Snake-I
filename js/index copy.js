import Canvas from './canvas.js'
import Snake from './snake.js'
// import SnakeChunk from './snakeChunk.js'
import { KEYS } from './utils.js'

// async function asFn () {
//   return new Promise((resolve) => setTimeout(() => resolve(), 1000))
// }

// async function main () {
//   const snake = new Snake()

//   for (let i = 0; i < 20; i++) {
//     await asFn(i)

//     Canvas.clearCanvas()

//     if (i === 1) {
//       snake.update(Snake.ACTION_DIRECTIONS.RIGHT)
//     } else if (i === 3) {
//       snake.update(Snake.ACTION_DIRECTIONS.RIGHT)
//     } else if (i === 4) {
//       snake.update(Snake.ACTION_DIRECTIONS.LEFT)
//     } else if (i === 5) {
//       snake.update(Snake.ACTION_DIRECTIONS.LEFT)
//     } else if (i === 7) {
//       snake.update(Snake.ACTION_DIRECTIONS.LEFT)
//     } else {
//       snake.update(Snake.ACTION_DIRECTIONS.STRAIGHT)
//     }
//   }
// }

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
