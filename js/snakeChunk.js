import Canvas from './canvas.js'
import Snake from './snake.js'
import { DIRECTIONS, ORIENTATIONS } from './utils.js'

export default class SnakeChunk {
  constructor ({ x, y, width, direction, color = 'black' }) {
    this.orientation = direction === DIRECTIONS.NORTH || direction === DIRECTIONS.SOUTH
      ? ORIENTATIONS.VERTICAL
      : ORIENTATIONS.HORIZONTAL
    this.x = x
    this.y = y
    this.width = width || SnakeChunk.INITIAL_SIZE
    this.height = SnakeChunk.INITIAL_SIZE
    this.direction = direction
    this.color = color
  }

  static INITIAL_SIZE = 10

  move () {
    if (this.direction === DIRECTIONS.NORTH) this.y -= Snake.DISPLACEMENT
    if (this.direction === DIRECTIONS.SOUTH) this.y += Snake.DISPLACEMENT
    if (this.direction === DIRECTIONS.EAST) this.x += Snake.DISPLACEMENT
    if (this.direction === DIRECTIONS.WEST) this.x -= Snake.DISPLACEMENT
  }

  shrink () {
    if (this.direction === DIRECTIONS.NORTH) this.height -= Snake.DISPLACEMENT
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height -= Snake.DISPLACEMENT
      this.y += Snake.DISPLACEMENT
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width -= Snake.DISPLACEMENT
      this.x += Snake.DISPLACEMENT
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width -= Snake.DISPLACEMENT
    }
  }

  expand () {
    if (this.direction === DIRECTIONS.NORTH) {
      this.height += Snake.DISPLACEMENT
      this.y -= Snake.DISPLACEMENT
    }
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height += Snake.DISPLACEMENT
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width += Snake.DISPLACEMENT
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width += Snake.DISPLACEMENT
      this.x -= Snake.DISPLACEMENT
    }
  }

  draw () {
    Canvas.drawRectangule(this.x, this.y, this.width, this.height, this.color)
  }
}
