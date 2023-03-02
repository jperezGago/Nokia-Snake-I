import Canvas from './canvas.js'
import Snake from './snake.js'
import Food from './food.js'
import Display from './display.js'
import Controls from './controls.js'
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
    const canvasWidth = initialSnakeLength + stepLength * 10 + BORDER_MARGIN_CANVAS * 2
    const canvasHeight = initialSnakeLength + stepLength * 3 + BORDER_MARGIN_CANVAS * 2
    const containerWidth = canvasWidth + 40
    const containerHeight = canvasHeight + 80

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
    const controls = new Controls()

    this.snake = snake
    this.display = display
    this.controls = controls
    this.food = food
    this.canvas = canvas
    this.gameId = null
    this.score = 0
  }

  resetScore () {
    this.score = 0
  }

  addScore () {
    this.score += 1
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

  animate () {
    this.gameId = window.requestAnimationFrame(this.animate.bind(this))

    if (this.snake.collision) {
      console.log('GAME OVER')
      window.cancelAnimationFrame(this.gameId)
      return
    }

    if (this.snake.collisionWithFood) {
      this.addScore()
      this.display.drawScore(this.score)
      const emptyPath = this.getEmptySnakePath()

      if (!emptyPath.length) {
        console.log('HAS GANADO!')
        window.cancelAnimationFrame(this.gameId)
        return
      }

      const { x, y } = emptyPath[getRandom(0, emptyPath.length - 1)]
      this.food.setPosition(x, y)
      this.snake.resetCollisionWithFood()
    }

    this.canvas.update()
    this.snake.update()
    this.food.update()
  }

  start () {
    const { x, y } = this.getEmptyFoodPosition()
    this.food.setPosition(x, y)
    this.controls.setSnakeControls(this.snake)
    this.animate()
  }
}
