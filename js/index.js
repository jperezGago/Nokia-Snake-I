import Canvas from './canvas.js'
import Snake from './snake.js'
import addKeysListener from './keys.js'
import Food from './food.js'
import { areBoxesInCollisions, CONTROL_DIRECTIONS, getRandom } from './utils.js'

const BORDER_MARGIN_CANVAS = 6
const VELOCITY = 8
const SHORT_LENGTH = 15
const SNAKE_MARGIN = 2

let gameId
const stepLength = SHORT_LENGTH + SNAKE_MARGIN
const minimalSnakeLength = stepLength + SHORT_LENGTH
const initialSnakeLength = minimalSnakeLength + stepLength * 5

const canvas = new Canvas({
  width: initialSnakeLength + stepLength * 20 + BORDER_MARGIN_CANVAS * 2,
  height: initialSnakeLength + stepLength * 13 + BORDER_MARGIN_CANVAS * 2,
  borderMargin: BORDER_MARGIN_CANVAS
})
const food = new Food(canvas, SHORT_LENGTH)
const snake = new Snake({
  food,
  velocity: VELOCITY,
  canvas,
  shortLength: SHORT_LENGTH,
  snakeMargin: SNAKE_MARGIN,
  initialLength: initialSnakeLength,
  borderMarginCanvas: BORDER_MARGIN_CANVAS
})

function getEmptySnakePath () {
  return snake.path.filter(pathBox =>
    snake.body.every(chunk => !areBoxesInCollisions(chunk, pathBox))
  )
}

function getEmptyFoodPosition () {
  const emptySnakePath = getEmptySnakePath()
  const { x, y } = emptySnakePath[getRandom(0, emptySnakePath.length - 1)]
  return { x, y }
}

function animate () {
  gameId = window.requestAnimationFrame(animate)

  if (snake.collision) {
    console.log('GAME OVER')
    window.cancelAnimationFrame(gameId)
    return
  }

  if (snake.collisionWithFood) {
    const emptyPath = getEmptySnakePath()

    if (!emptyPath.length) {
      console.log('HAS GANADO!')
      window.cancelAnimationFrame(gameId)
      return
    }

    const { x, y } = emptyPath[getRandom(0, emptyPath.length - 1)]
    food.setPosition(x, y)
    snake.resetCollisionWithFood()
  }

  canvas.update()
  snake.update()
  food.update()
}

const { x, y } = getEmptyFoodPosition()
food.setPosition(x, y)
addKeysListener({
  handleLeftKeyPressed: () => snake.setDirection(CONTROL_DIRECTIONS.LEFT),
  handleRightKetPressed: () => snake.setDirection(CONTROL_DIRECTIONS.RIGHT)
})
animate()
