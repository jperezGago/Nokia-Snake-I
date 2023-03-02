export default class Food {
  constructor (canvas, size) {
    this.miniSquareSize = (size - 1) / 3
    this.miniSquareSizeMargin = 0.5
    // Necessary to check for collisions
    this.width = size
    this.height = size
    // this.borderMarginCanvas = borderMarginCanvas
    this.canvas = canvas
  }

  draw () {
    this.canvas.drawRectangule({
      x: this.x + this.miniSquareSize,
      y: this.y,
      width: this.miniSquareSize,
      height: this.miniSquareSize
    })
    this.canvas.drawRectangule({
      x: this.x + this.miniSquareSize,
      y: this.y + 2 * this.miniSquareSize,
      width: this.miniSquareSize,
      height: this.miniSquareSize
    })
    this.canvas.drawRectangule({
      x: this.x,
      y: this.y + this.miniSquareSize,
      width: this.miniSquareSize,
      height: this.miniSquareSize
    })
    this.canvas.drawRectangule({
      x: this.x + 2 * this.miniSquareSize,
      y: this.y + this.miniSquareSize,
      width: this.miniSquareSize,
      height: this.miniSquareSize
    })
  }

  setPosition (x, y) {
    this.x = x + this.miniSquareSizeMargin
    this.y = y + this.miniSquareSizeMargin
  }

  update () {
    this.draw()
  }
}
