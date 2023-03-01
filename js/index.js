import Canvas from './canvas.js'
import Snake from './snake.js'
import addKeysListener from './keys.js'
import Food from './food.js'
import { areBoxesInCollisions, CONTROL_DIRECTIONS, getRandom } from './utils.js'

const BORDER_MARGIN_CANVAS = 0
const VELOCITY = 1
const SHORT_LENGTH = 10
const SNAKE_MARGIN = 5

let gameId
const stepLength = SHORT_LENGTH + SNAKE_MARGIN
const minimalSnakeLength = stepLength + SHORT_LENGTH
const initialSnakeLength = minimalSnakeLength + stepLength * 1

const canvas = new Canvas({
  width: initialSnakeLength + stepLength * 1 + BORDER_MARGIN_CANVAS * 2,
  height: initialSnakeLength + stepLength * 1 + BORDER_MARGIN_CANVAS * 2,
  borderMargin: BORDER_MARGIN_CANVAS
})
const food = new Food(canvas)
const snake = new Snake({
  food,
  velocity: VELOCITY,
  canvas,
  shortLength: SHORT_LENGTH,
  snakeMargin: SNAKE_MARGIN,
  initialLength: initialSnakeLength
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
