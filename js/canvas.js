export default class Canvas {
  constructor (borderMargin) {
    const ctx = document.querySelector('canvas').getContext('2d')

    this.width = ctx.canvas.width
    this.height = ctx.canvas.height
    this.borderMargin = borderMargin
    this.ctx = ctx
  }

  drawRectangule ({ x, y, width, height, fill = true, color = 'black' }) {
    if (fill) {
      this.ctx.fillStyle = color
      this.ctx.fillRect(x, y, width, height)
      return
    }

    this.ctx.strokeStyle = color
    this.ctx.strokeRect(x, y, width, height)
  }

  clearCanvas () {
    const canvas = document.querySelector('canvas')
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  update () {
    this.clearCanvas()
  }
}
