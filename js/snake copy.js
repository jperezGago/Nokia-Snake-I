import Canvas from './canvas.js'
import SnakeChunk from './snakeChunk.js'
import { DIRECTIONS, ORIENTATIONS } from './utils.js'

export default class Snake {
  constructor () {
    this.body = [SnakeChunk.createInitial()]
  }

  static STEP_SIZE = 15
  static DISPLACEMENT = 1
  static ACTION_DIRECTIONS = {
    STRAIGHT: Symbol('STRAIGHT'),
    LEFT: Symbol('LEFT'),
    RIGHT: Symbol('RIGHT')
  }

  getNewChunkPosition (newChunkDirection) {
    const beforeChunk = this.body[this.body.length - 1]

    if (beforeChunk.direction === DIRECTIONS.NORTH) {
      return {
        x: beforeChunk.x,
        y: beforeChunk.y
      }
    }

    if (beforeChunk.direction === DIRECTIONS.SOUTH) {
      return {
        x: beforeChunk.x,
        y: beforeChunk.y + beforeChunk.height - SnakeChunk.INITIAL_SIZE
      }
    }

    if (beforeChunk.direction === DIRECTIONS.EAST) {
      return {
        x: beforeChunk.x + beforeChunk.width - SnakeChunk.INITIAL_SIZE,
        y: beforeChunk.y
      }
    }

    if (beforeChunk.direction === DIRECTIONS.WEST) {
      return {
        x: beforeChunk.x,
        y: beforeChunk.y
      }
    }
  }

  // getNewChunkOrientation (snakeChunkDirection) {
  //   if (snakeChunkDirection === DIRECTIONS.NORTH) {
  //     return ORIENTATIONS.VERTICAL
  //   }
  //   if (snakeChunkDirection === DIRECTIONS.SOUTH) {
  //     return ORIENTATIONS.VERTICAL
  //   }
  //   if (snakeChunkDirection === DIRECTIONS.EAST) {
  //     return ORIENTATIONS.HORIZONTAL
  //   }
  //   if (snakeChunkDirection === DIRECTIONS.WEST) {
  //     return ORIENTATIONS.HORIZONTAL
  //   }
  // }

  getNewChunkDirection (direction) {
    const snakeHead = this.body[this.body.length - 1]

    if (snakeHead.direction === DIRECTIONS.NORTH) {
      return direction === Snake.ACTION_DIRECTIONS.LEFT
        ? DIRECTIONS.WEST
        : DIRECTIONS.EAST
    }
    if (snakeHead.direction === DIRECTIONS.SOUTH) {
      return direction === Snake.ACTION_DIRECTIONS.LEFT
        ? DIRECTIONS.EAST
        : DIRECTIONS.WEST
    }
    if (snakeHead.direction === DIRECTIONS.EAST) {
      return direction === Snake.ACTION_DIRECTIONS.LEFT
        ? DIRECTIONS.NORTH
        : DIRECTIONS.SOUTH
    }
    if (snakeHead.direction === DIRECTIONS.WEST) {
      return direction === Snake.ACTION_DIRECTIONS.LEFT
        ? DIRECTIONS.SOUTH
        : DIRECTIONS.NORTH
    }
  }

  createChunk (direction) {
    const newChunkDirection = this.getNewChunkDirection(direction)

    return new SnakeChunk({
      ...this.getNewChunkPosition(newChunkDirection),
      direction: newChunkDirection
    })
  }

  move (direction) {
    if (direction === Snake.ACTION_DIRECTIONS.STRAIGHT && this.body.length === 1) {
      const [snakeHead] = this.body
      snakeHead.move()
      return
    }

    const snakeTail = this.body[0]

    if (
      (snakeTail.orientation === ORIENTATIONS.HORIZONTAL && snakeTail.width <= SnakeChunk.INITIAL_SIZE) ||
      (snakeTail.orientation === ORIENTATIONS.VERTICAL && snakeTail.height <= SnakeChunk.INITIAL_SIZE)
    ) {
      this.body.shift()
      const snakeTail = this.body[0]
      snakeTail.shrink()
    } else {
      snakeTail.shrink()
    }

    if (direction === Snake.ACTION_DIRECTIONS.STRAIGHT) {
      const snakeHead = this.body[this.body.length - 1]
      snakeHead.expand()
      return
    }

    const newChunk = this.createChunk(direction)
    this.body.push(newChunk)
  }

  draw () {
    this.body.forEach((snakeChunk) => Canvas.drawRectangule(
      snakeChunk.x,
      snakeChunk.y,
      snakeChunk.width,
      snakeChunk.height
    ))
  }

  update (direction) {
    this.draw()
    this.move(direction)
  }
}
