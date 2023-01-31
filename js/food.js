import Canvas from './canvas.js'

export default class Food {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
    this.enable = false
    this.size = 2
    this.color = 'grey'
  }

  draw () {
    Canvas.drawRectangule({
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size,
      color: this.color
    })
    Canvas.drawRectangule({
      x: this.x,
      y: this.y + 4,
      width: this.size,
      height: this.size,
      color: this.color
    })
    Canvas.drawRectangule({
      x: this.x - 2,
      y: this.y + 2,
      width: this.size,
      height: this.size,
      color: this.color
    })
    Canvas.drawRectangule({
      x: this.x + 2,
      y: this.y + 2,
      width: this.size,
      height: this.size,
      color: this.color
    })
  }

  update () {
    if (this.enable) {
      this.draw()
    }
  }

  setEnable (x, y) {
    this.x = x
    this.y = y
    this.enable = true
  }

  setDisable () {
    this.enable = false
  }
}
