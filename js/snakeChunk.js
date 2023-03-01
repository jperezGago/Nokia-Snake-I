import { DIRECTIONS } from './utils.js'

export default class SnakeChunk {
  constructor ({ x, y, width, height, direction, canvas }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.direction = direction
    this.canvas = canvas
  }

  move (length) {
    if (this.direction === DIRECTIONS.NORTH) this.y -= length
    if (this.direction === DIRECTIONS.SOUTH) this.y += length
    if (this.direction === DIRECTIONS.EAST) this.x += length
    if (this.direction === DIRECTIONS.WEST) this.x -= length
  }

  shrink (decrement) {
    if (this.direction === DIRECTIONS.NORTH) this.height -= decrement
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height -= decrement
      this.y += decrement
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width -= decrement
      this.x += decrement
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width -= decrement
    }
  }

  expand (increment) {
    if (this.direction === DIRECTIONS.NORTH) {
      this.height += increment
      this.y -= increment
    }
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height += increment
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width += increment
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width += increment
      this.x -= increment
    }
  }

  tailExpand (increment) {
    if (this.direction === DIRECTIONS.NORTH) {
      this.height += increment
    }
    if (this.direction === DIRECTIONS.SOUTH) {
      this.height += increment
      this.y -= increment
    }
    if (this.direction === DIRECTIONS.EAST) {
      this.width += increment
      this.x -= increment
    }
    if (this.direction === DIRECTIONS.WEST) {
      this.width += increment
    }
  }

  draw () {
    this.canvas.drawRectangule({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    })
  }
}
