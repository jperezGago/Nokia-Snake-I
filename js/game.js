import Canvas from './canvas.js'
import Snake from './snake.js'
import Food from './food.js'
import Display from './display.js'
import Controls from './controls.js'
import Score from './score.js'
import { areBoxesInCollisions, getRandom } from './utils.js'

export default class Game {
  constructor () {
    const BORDER_MARGIN_CANVAS = 3
    const VELOCITY = 5
    const SHORT_LENGTH = 10
    const SNAKE_MARGIN = 2

    const stepLength = SHORT_LENGTH + SNAKE_MARGIN
    const minimalSnakeLength = stepLength + SHORT_LENGTH
    const initialSnakeLength = minimalSnakeLength + stepLength * 5

    const display = new Display()
    const canvas = new Canvas(BORDER_MARGIN_CANVAS)
    const food = new Food(canvas, SHORT_LENGTH)
    const score = new Score()
    const snake = new Snake({
      food,
      velocity: VELOCITY,
      canvas,
      shortLength: SHORT_LENGTH,
      snakeMargin: SNAKE_MARGIN,
      initialLength: initialSnakeLength,
      borderMarginCanvas: BORDER_MARGIN_CANVAS
    })
    const controls = new Controls()

    this.snake = snake
    this.display = display
    this.controls = controls
    this.food = food
    this.canvas = canvas
    this.gameId = null
    this.score = score
    this.isRunning = false
  }

  startGame () {
    this.isRunning = true
    this.controls.setSnakeControls(
      this.snake.setControlDirection.bind(this.snake)
    )
  }

  stopGame ({ winner }) {
    const message = winner
      ? `CONGRATULATIONS!
      You have completed the game`
      : `GAME OVER! 
      Score: ${this.score.value}`

    this.isRunning = false
    this.display.drawFinishGame(message)
    this.score.reset()
    this.snake.reset()
  }

  getEmptySnakePath () {
    return this.snake.path.filter(pathBox =>
      this.snake.body.every(chunk => !areBoxesInCollisions(chunk, pathBox))
    )
  }

  getEmptyFoodPosition () {
    const emptySnakePath = this.getEmptySnakePath()
    const { x, y } = emptySnakePath[getRandom(0, emptySnakePath.length - 1)]
    return { x, y }
  }

  setNewFoodPosition (emptyPath) {
    const { x, y } = emptyPath[getRandom(0, emptyPath.length - 1)]
    this.food.setPosition(x, y)
    this.snake.resetCollisionWithFood()
  }

  update () {
    this.gameId = window.requestAnimationFrame(this.update.bind(this))

    if (!this.isRunning) return

    if (this.snake.collision) {
      this.stopGame({ winner: false })
      return
    }

    if (!this.snake.collisionWithFood) {
      this.display.drawGame()
      this.canvas.update()
      this.snake.update()
      this.food.update()
      return
    }

    this.score.add()
    const emptyPath = this.getEmptySnakePath()

    if (!emptyPath.length) {
      this.stopGame({ winner: true })
      return
    }

    this.setNewFoodPosition(emptyPath)
  }

  start () {
    this.display.drawMenu()
    const { x, y } = this.getEmptyFoodPosition()
    this.food.setPosition(x, y)
    this.controls.setStartControl(this.startGame.bind(this))
    this.update()
  }
}
