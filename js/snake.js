import Controls from './controls.js'
import SnakeChunk from './snakeChunk.js'
import { DIRECTIONS, areBoxesInCollisions, FPS } from './utils.js'

export default class Snake {
  constructor ({ food, velocity, canvas, shortLength, snakeMargin, initialLength, borderMarginCanvas }) {
    const stepLength = shortLength + snakeMargin

    this.velocity = velocity
    this.collision = false
    this.collisionWithFood = false
    this.controlDirection = null
    this.food = food
    this.cicles = 0
    this.stepLength = stepLength
    this.canvas = canvas
    this.initialLength = initialLength
    this.shortLength = shortLength
    this.borderMarginCanvas = borderMarginCanvas
    this.initialLongLengthChunk = stepLength + shortLength
    this.path = this.getPath()
    this.body = this.getInitialBody()
  }

  getInitialBody () {
    return [
      new SnakeChunk({
        x: this.canvas.borderMargin,
        y: this.canvas.height - this.shortLength - this.canvas.borderMargin,
        width: this.initialLength,
        height: this.shortLength,
        direction: DIRECTIONS.EAST,
        canvas: this.canvas
      })
    ]
  }

  getPath () {
    const xPath = new Array(1 + (this.canvas.width - 2 * this.borderMarginCanvas - this.shortLength) / this.stepLength)
      .fill(null)
      .map((_, index) => this.borderMarginCanvas + this.stepLength * index)
    const yPath = new Array(1 + (this.canvas.height - 2 * this.borderMarginCanvas - this.shortLength) / this.stepLength)
      .fill(null)
      .map((_, index) => this.borderMarginCanvas + this.stepLength * index)

    return yPath.flatMap(y =>
      xPath.map(x => ({ x, y, width: this.shortLength, height: this.shortLength }))
    )
  }

  getNewChunkPosition (newChunkDirection) {
    const beforeChunk = this.body[this.body.length - 1]

    if (beforeChunk.direction === DIRECTIONS.NORTH) {
      return {
        x: beforeChunk.x + (newChunkDirection === DIRECTIONS.WEST && -this.stepLength),
        y: beforeChunk.y
      }
    }

    if (beforeChunk.direction === DIRECTIONS.SOUTH) {
      return {
        x: beforeChunk.x + (newChunkDirection === DIRECTIONS.WEST && -this.stepLength),
        y: beforeChunk.y + beforeChunk.height - this.shortLength
      }
    }

    if (beforeChunk.direction === DIRECTIONS.EAST) {
      return {
        x: beforeChunk.x + beforeChunk.width - this.shortLength,
        y: beforeChunk.y + (newChunkDirection === DIRECTIONS.NORTH && -this.stepLength)
      }
    }

    if (beforeChunk.direction === DIRECTIONS.WEST) {
      return {
        x: beforeChunk.x,
        y: beforeChunk.y + (newChunkDirection === DIRECTIONS.NORTH && -this.stepLength)
      }
    }
  }

  getNewChunkDirection () {
    const snakeHead = this.body[this.body.length - 1]

    if (snakeHead.direction === DIRECTIONS.NORTH) {
      return this.controlDirection === Controls.controlDirections.left
        ? DIRECTIONS.WEST
        : DIRECTIONS.EAST
    }
    if (snakeHead.direction === DIRECTIONS.SOUTH) {
      return this.controlDirection === Controls.controlDirections.left
        ? DIRECTIONS.EAST
        : DIRECTIONS.WEST
    }
    if (snakeHead.direction === DIRECTIONS.EAST) {
      return this.controlDirection === Controls.controlDirections.left
        ? DIRECTIONS.NORTH
        : DIRECTIONS.SOUTH
    }
    if (snakeHead.direction === DIRECTIONS.WEST) {
      return this.controlDirection === Controls.controlDirections.left
        ? DIRECTIONS.SOUTH
        : DIRECTIONS.NORTH
    }
  }

  getNewChunkSizes (direction) {
    const shortLengthChunk = this.shortLength

    if (direction === DIRECTIONS.NORTH || direction === DIRECTIONS.SOUTH) {
      return {
        height: this.initialLongLengthChunk,
        width: shortLengthChunk
      }
    }

    return {
      width: this.initialLongLengthChunk,
      height: shortLengthChunk
    }
  }

  createChunk () {
    const direction = this.getNewChunkDirection()

    return new SnakeChunk({
      ...this.getNewChunkPosition(direction),
      ...this.getNewChunkSizes(direction),
      direction,
      canvas: this.canvas
    })
  }

  moveSingleChunkStraight () {
    const [snakeHead] = this.body
    snakeHead.move(this.stepLength)
  }

  shrinkTailChunk () {
    const snakeTail = this.body[0]
    snakeTail.shrink(this.stepLength)
  }

  expandHeadChunk () {
    const snakeHead = this.body[this.body.length - 1]
    snakeHead.expand(this.stepLength)
  }

  expandTailChunk () {
    const snakeTail = this.body[0]
    snakeTail.tailExpand(this.stepLength)
  }

  getSnakeTailLength () {
    const snakeTail = this.body[0]

    return snakeTail.direction === DIRECTIONS.NORTH || snakeTail.direction === DIRECTIONS.SOUTH
      ? snakeTail.height
      : snakeTail.width
  }

  resetControlDirection () {
    this.controlDirection = null
  }

  removeHiddenTail () {
    this.body.shift()
  }

  turn () {
    const newChunk = this.createChunk()
    this.body.push(newChunk)

    const snakeTailLength = this.getSnakeTailLength()

    if (snakeTailLength > this.shortLength) {
      this.shrinkTailChunk()
      return
    }

    this.removeHiddenTail()
    this.shrinkTailChunk()
  }

  moveStraight () {
    const snakeTailLength = this.getSnakeTailLength()

    if (snakeTailLength > this.shortLength) {
      this.shrinkTailChunk()
      this.expandHeadChunk()
      return
    }

    this.removeHiddenTail()
    this.move()
  }

  move () {
    if (!this.controlDirection && this.body.length === 1) {
      this.moveSingleChunkStraight()
      return
    }

    if (this.controlDirection) {
      this.turn()
      this.resetControlDirection()
      return
    }

    this.moveStraight()
  }

  setCollision () {
    this.collision = true
  }

  reset () {
    this.collision = false
    this.body = this.getInitialBody()
  }

  checkBordersCollisions (snakeHead) {
    if (
      snakeHead.x + snakeHead.width > this.canvas.width ||
      snakeHead.y + snakeHead.height > this.canvas.height ||
      snakeHead.x < 0 ||
      snakeHead.y < 0
    ) {
      this.setCollision()
    }
  }

  checkAutoCollisions (snakeHead) {
    const MINIMUM_CHUNKS_TO_CRASH = 4
    const bodyLength = this.body.length

    if (bodyLength < MINIMUM_CHUNKS_TO_CRASH) return

    this.body.forEach((snakeChunk, index) => {
      if (bodyLength - 1 - index < 3) return

      if (areBoxesInCollisions(snakeHead, snakeChunk)) {
        this.setCollision()
      }
    })
  }

  resetCollisionWithFood () {
    this.collisionWithFood = false
  }

  checkFoodCollision (snakeHead) {
    if (areBoxesInCollisions(snakeHead, this.food)) {
      this.expandTailChunk()
      this.collisionWithFood = true
    }
  }

  checkCollisions () {
    const snakeHead = this.body[this.body.length - 1]

    this.checkBordersCollisions(snakeHead)
    this.checkAutoCollisions(snakeHead)
    this.checkFoodCollision(snakeHead)
  }

  setDirection (direction) {
    this.controlDirection = direction
  }

  draw () {
    this.body.forEach((snakeChunk) => snakeChunk.draw())
  }

  update () {
    if (this.cicles >= FPS / this.velocity) {
      this.move()
      this.checkCollisions()
      this.cicles = 0
    }

    this.draw()
    this.cicles += 1
  }
}
