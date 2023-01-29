import Canvas from './canvas.js'
import { DIRECTIONS, ORIENTATIONS } from './utils.js'

export default class SnakeChunk {
  constructor ({ x, y, width, direction, velocity, color = 'black' }) {
    this.orientation = direction === DIRECTIONS.NORTH || direction === DIRECTIONS.SOUTH
      ? ORIENTATIONS.VERTICAL
      : ORIENTATIONS.HORIZONTAL
    this.x = x
    this.y = y
    this.width = width || SnakeChunk.INITIAL_SIZE
    this.height = SnakeChunk.INITIAL_SIZE
    this.direction = direction
    this.velocity = velocity
    this.color = color
  }

  static INITIAL_SIZE = 10

  move () {
    if (this.direction === DIRECTIONS.NORTH) this.y -= this.velocity
    if (this.direction === DIRECTIONS.SOUTH) this.y += this.velocity
    if (this.direction === DIRECTIONS.EAST) this.x += this.velocity
    if (this.direction === DIRECTIONS.WEST) this.x -= this.velocity
  }

  shrink () {
    if (this.direction === DIRECTIONS.NORTH) this.height -= this.velocity
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height -= this.velocity
      this.y += this.velocity
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width -= this.velocity
      this.x += this.velocity
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width -= this.velocity
    }
  }

  expand () {
    if (this.direction === DIRECTIONS.NORTH) {
      this.height += this.velocity
      this.y -= this.velocity
    }
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height += this.velocity
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width += this.velocity
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width += this.velocity
      this.x -= this.velocity
    }
  }

  draw () {
    Canvas.drawRectangule({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    })
  }
}
