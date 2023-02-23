import SnakeChunk from './snakeChunk.js'
import { DIRECTIONS, ORIENTATIONS, areBoxesInCollisions } from './utils.js'

export default class Snake {
  constructor (food) {
    const canvas = document.querySelector('canvas')
    const velocity = 0.5
    const snakeMargin = 2
    const boundariesMargin = 3
    const stepSize = SnakeChunk.INITIAL_SIZE + snakeMargin

    this.velocity = velocity
    this.collision = false
    this.body = [
      new SnakeChunk({
        x: boundariesMargin,
        y: canvas.height - SnakeChunk.INITIAL_SIZE - boundariesMargin,
        width: stepSize * 6,
        direction: DIRECTIONS.EAST,
        velocity
      })
    ]
    this.direction = Snake.DIRECTIONS.STRAIGHT
    this.relativeDisplacement = 0
    this.stepSize = stepSize
    this.food = food
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

  getNewChunkDirection () {
    const snakeHead = this.body[this.body.length - 1]

    if (snakeHead.direction === DIRECTIONS.NORTH) {
      return this.direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.WEST
        : DIRECTIONS.EAST
    }
    if (snakeHead.direction === DIRECTIONS.SOUTH) {
      return this.direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.EAST
        : DIRECTIONS.WEST
    }
    if (snakeHead.direction === DIRECTIONS.EAST) {
      return this.direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.NORTH
        : DIRECTIONS.SOUTH
    }
    if (snakeHead.direction === DIRECTIONS.WEST) {
      return this.direction === Snake.DIRECTIONS.LEFT
        ? DIRECTIONS.SOUTH
        : DIRECTIONS.NORTH
    }
  }

  createChunk () {
    const newChunkDirection = this.getNewChunkDirection()

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

  resetControlDirection () {
    this.direction = Snake.DIRECTIONS.STRAIGHT
  }

  turn () {
    const newChunk = this.createChunk()
    this.body.push(newChunk)
  }

  move () {
    if (
      this.direction === Snake.DIRECTIONS.STRAIGHT &&
      this.body.length === 1
    ) {
      this.moveSingleChunkStraight()
      this.updateRelativeDisplacement()
      return
    }

    if (
      this.relativeDisplacement >= this.stepSize - this.velocity &&
      this.direction !== Snake.DIRECTIONS.STRAIGHT
    ) {
      this.turn()
      this.resetRelativeDisplacementAfterTurning()
      this.resetControlDirection()
      return
    }

    this.moveStraight()
    this.updateRelativeDisplacement()
  }

  draw () {
    this.body.forEach((snakeChunk) => snakeChunk.draw())
  }

  checkBoundariesCollisions (snakeHead) {
    const canvas = document.querySelector('canvas')

    if (
      snakeHead.x + snakeHead.width > canvas.width ||
      snakeHead.y + snakeHead.height > canvas.height ||
      snakeHead.x < 0 ||
      snakeHead.y < 0
    ) {
      this.collision = true
    }
  }

  checkAutoCollisions (snakeHead) {
    const bodyLength = this.body.length

    if (bodyLength < 4) return

    this.body.forEach((snakeChunk, index) => {
      if (bodyLength - 1 - index < 3) return

      if (areBoxesInCollisions(snakeHead, snakeChunk)) {
        this.collision = true
      }
    })
  }

  checkFoodCollision (snakeHead) {
    if (areBoxesInCollisions(snakeHead, this.food)) {
      this.food.setPosition()

      const snakeHead = this.body[this.body.length - 1]
      snakeHead.expand(5)
    }
  }

  checkCollisions () {
    const snakeHead = this.body[this.body.length - 1]

    this.checkBoundariesCollisions(snakeHead)
    this.checkAutoCollisions(snakeHead)
    this.checkFoodCollision(snakeHead)
  }

  resetRelativeDisplacementAfterTurning () {
    const lastChunkWithSameOrientation = this.body[this.body.length - 3]

    if (!lastChunkWithSameOrientation) {
      this.relativeDisplacement = SnakeChunk.INITIAL_SIZE
      return
    }

    const lastDirectionWithSameOrientation = lastChunkWithSameOrientation.direction
    const lastChunkDirection = this.body[this.body.length - 1].direction

    if (lastDirectionWithSameOrientation === lastChunkDirection) {
      this.relativeDisplacement = 0
      return
    }

    this.relativeDisplacement = SnakeChunk.INITIAL_SIZE
  }

  updateRelativeDisplacement () {
    if (this.relativeDisplacement >= this.stepSize - this.velocity) {
      this.relativeDisplacement = 0
    } else {
      this.relativeDisplacement += this.velocity
    }
  }

  setDirection (direction) {
    this.direction = direction
  }

  update () {
    this.draw()

    if (!this.collision) {
      this.checkCollisions()
      this.move()
    }
  }
}
