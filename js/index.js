import Canvas from './canvas.js'
import Snake from './snake.js'
import addKeysListener from './keys.js'
import Food from './food.js'
import { areBoxesInCollisions, CONTROL_DIRECTIONS, getRandom } from './utils.js'
import Display from './display.js'
import Game from './game.js'

const BORDER_MARGIN_CANVAS = 3
const VELOCITY = 5
const SHORT_LENGTH = 10
const SNAKE_MARGIN = 2

let gameId
const stepLength = SHORT_LENGTH + SNAKE_MARGIN
const minimalSnakeLength = stepLength + SHORT_LENGTH
const initialSnakeLength = minimalSnakeLength + stepLength * 5
const canvasWidth = initialSnakeLength + stepLength * 10 + BORDER_MARGIN_CANVAS * 2
const canvasHeight = initialSnakeLength + stepLength * 3 + BORDER_MARGIN_CANVAS * 2
const containerWidth = canvasWidth + 40
const containerHeight = canvasHeight + 80

const game = new Game()
const display = new Display(containerWidth, containerHeight)
const canvas = new Canvas({
  width: canvasWidth,
  height: canvasHeight,
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
    game.addScore()
    display.drawScore(game.score)
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
