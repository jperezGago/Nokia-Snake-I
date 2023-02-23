import Canvas from './canvas.js'
import SnakeChunk from './SnakeChunk.js'
import { getRandom } from './utils.js'

export default class Food {
  constructor () {
    const size = 6
    const boundariesMargin = 3
    const snakeMargin = 2
    const canvasBorder = 1
    const firstPosition = canvasBorder + boundariesMargin + SnakeChunk.INITIAL_SIZE / 2 - size / 2
    const stepSize = SnakeChunk.INITIAL_SIZE + snakeMargin

    this.possiblePosition = new Array(17).fill(undefined).map((_, index) => firstPosition + stepSize * index)
    console.log('possiblePosition', this.possiblePosition)
    this.x = this.getRandomX()
    this.y = this.getRandomY()
    this.squareSize = 2
    this.color = 'grey'
    this.width = size
    this.height = size
  }

  draw () {
    Canvas.drawRectangule({
      x: this.x + 2,
      y: this.y,
      width: this.squareSize,
      height: this.squareSize,
      color: this.color
    })
    Canvas.drawRectangule({
      x: this.x + 2,
      y: this.y + 4,
      width: this.squareSize,
      height: this.squareSize,
      color: this.color
    })
    Canvas.drawRectangule({
      x: this.x,
      y: this.y + 2,
      width: this.squareSize,
      height: this.squareSize,
      color: this.color
    })
    Canvas.drawRectangule({
      x: this.x + 4,
      y: this.y + 2,
      width: this.squareSize,
      height: this.squareSize,
      color: this.color
    })
  }

  getRandomX () {
    return this.possiblePosition[getRandom(0, this.possiblePosition.length - 1)]
  }

  getRandomY () {
    return this.possiblePosition[getRandom(0, 10)]
  }

  setPosition (x, y) {
    this.x = this.getRandomX()
    this.y = this.getRandomY()
  }

  update () {
    this.draw()
  }
}
