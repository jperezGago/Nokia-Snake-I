export default class Food {
  constructor (canvas) {
    const SQUARE_SIZE = 10

    this.x = 45
    this.y = 0
    this.miniSquareSize = 2
    this.color = 'grey'
    // Necessary to check for collisions
    this.width = SQUARE_SIZE
    this.height = SQUARE_SIZE
    this.canvas = canvas
  }

  draw () {
    this.canvas.drawRectangule({
      x: this.x + 4,
      y: this.y + 2,
      width: this.miniSquareSize,
      height: this.miniSquareSize,
      color: this.color
    })
    this.canvas.drawRectangule({
      x: this.x + 4,
      y: this.y + 6,
      width: this.miniSquareSize,
      height: this.miniSquareSize,
      color: this.color
    })
    this.canvas.drawRectangule({
      x: this.x + 2,
      y: this.y + 4,
      width: this.miniSquareSize,
      height: this.miniSquareSize,
      color: this.color
    })
    this.canvas.drawRectangule({
      x: this.x + 6,
      y: this.y + 4,
      width: this.miniSquareSize,
      height: this.miniSquareSize,
      color: this.color
    })
  }

  setPosition (x, y) {
    this.x = x
    this.y = y
  }

  1
  update () {
    this.draw()
  }
}
