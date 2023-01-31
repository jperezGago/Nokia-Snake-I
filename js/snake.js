import SnakeChunk from './snakeChunk.js'
import { DIRECTIONS, ORIENTATIONS } from './utils.js'

export default class Snake {
  constructor () {
    const canvas = document.querySelector('canvas')
    const velocity = 1

    this.velocity = velocity
    this.collision = false
    this.body = [
      new SnakeChunk({
        x: SnakeChunk.INITIAL_SIZE - 1,
        y: canvas.height - SnakeChunk.INITIAL_SIZE - 2,
        width: 80,
        direction: DIRECTIONS.EAST,
        velocity
      })
    ]
    this.direction = Snake.DIRECTIONS.STRAIGHT
    this.relativeDisplacement = 0
    this.stepSize = SnakeChunk.INITIAL_SIZE + SnakeChunk.INITIAL_SIZE / 2 - 1
  }

  static DIRECTIONS = {
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
      return direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.WEST
        : DIRECTIONS.EAST
    }
    if (snakeHead.direction === DIRECTIONS.SOUTH) {
      return direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.EAST
        : DIRECTIONS.WEST
    }
    if (snakeHead.direction === DIRECTIONS.EAST) {
      return direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.NORTH
        : DIRECTIONS.SOUTH
    }
    if (snakeHead.direction === DIRECTIONS.WEST) {
      return direction === Snake.DIRECTIONS.LEFT
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

  moveSingleChunkStraight () {
    const [snakeHead] = this.body
    snakeHead.move()
  }

  shrinkTailChunk () {
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
  }

  expandHeadChunk () {
    const snakeHead = this.body[this.body.length - 1]
    snakeHead.expand()
  }

  moveStraight () {
    this.shrinkTailChunk()
    this.expandHeadChunk()
  }

  resetDirection () {
    this.direction = Snake.DIRECTIONS.STRAIGHT
  }

  turn () {
    const newChunk = this.createChunk(this.direction)
    this.body.push(newChunk)
  }

  resetRelativeDisplacement () {
    this.relativeDisplacement = 0
  }

  incrementRelativeDisplacement () {
    this.relativeDisplacement += this.velocity
  }

  move () {
    if (this.direction === Snake.DIRECTIONS.STRAIGHT && this.body.length === 1) {
      this.moveSingleChunkStraight()
      return
    }

    if (this.relativeDisplacement >= this.stepSize && this.direction !== Snake.DIRECTIONS.STRAIGHT) {
      this.turn()
      this.resetDirection()
      return
    }

    this.moveStraight()
  }

  draw () {
    this.body.forEach((snakeChunk) => snakeChunk.draw())
  }

  setCollision () {
    this.collision = true
  }

  checkCollision () {
    const snakeHead = this.body[this.body.length - 1]
    const canvas = document.querySelector('canvas')

    if (snakeHead.x + snakeHead.width > canvas.width ||
        snakeHead.y + snakeHead.height > canvas.height ||
        snakeHead.x < 0 ||
        snakeHead.y < 0
    ) {
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

  manageRelativeDisplacement () {
    if (this.relativeDisplacement >= this.stepSize) {
      this.resetRelativeDisplacement()
    } else {
      this.incrementRelativeDisplacement()
    }
  }

  setDirection (direction) {
    this.direction = direction
  }

  update () {
    this.draw()

    if (this.collision) {
      return
    }

    this.checkCollision()
    this.manageRelativeDisplacement()
    this.move()
  }
}
