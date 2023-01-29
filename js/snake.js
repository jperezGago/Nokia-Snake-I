import Canvas from './canvas.js'
import SnakeChunk from './snakeChunk.js'
import { DIRECTIONS, ORIENTATIONS } from './utils.js'

export default class Snake {
  constructor () {
    const canvas = document.querySelector('canvas')
    const velocity = 1

    this.velocity = velocity
    this.collision = false
    this.body = [new SnakeChunk({
      x: 0,
      y: canvas.height - SnakeChunk.INITIAL_SIZE,
      width: 200,
      direction: DIRECTIONS.EAST,
      velocity
    })]
  }

  static STEP_SIZE = 15
  static DISPLACEMENT = 0.5
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
      direction: newChunkDirection,
      velocity: this.velocity
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
      (snakeTail.orientation === ORIENTATIONS.HORIZONTAL &&
        snakeTail.width <= SnakeChunk.INITIAL_SIZE) ||
      (snakeTail.orientation === ORIENTATIONS.VERTICAL &&
        snakeTail.height <= SnakeChunk.INITIAL_SIZE)
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

  setCollision () {
    console.log('BOOM!!!')
    this.collision = true
  }

  checkCollision () {
    const snakeHead = this.body[this.body.length - 1]
    const canvas = document.querySelector('canvas')

    if (snakeHead.x + snakeHead.width > canvas.width ||
        snakeHead.y + snakeHead.height > canvas.height) {
      this.setCollision()
    }

    this.body.forEach((snakeChunk, index) => {
      if (
        (
          (snakeHead.x + snakeHead.width > snakeChunk.x && snakeHead.x + snakeHead.width < snakeChunk.x + snakeChunk.width) ||
          (snakeHead.x > snakeChunk.x && snakeHead.x < snakeChunk.x + snakeChunk.width)
        ) &&
        (
          (snakeHead.y < snakeChunk.y + snakeChunk.height && snakeHead.y > snakeChunk.y) ||
          (snakeHead.y + snakeHead.height > snakeChunk.y && snakeHead.y + snakeHead.height < snakeChunk.y + snakeChunk.height)
        )
      ) {
        this.setCollision()
      }
    })
  }

  update (direction) {
    this.draw()

    if (this.collision) {
      return
    }

    this.checkCollision()
    this.move(direction)
  }
}
