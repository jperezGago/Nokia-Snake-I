export default class Canvas {
  constructor ({ width, height, borderMargin }) {
    const ctx = document.querySelector('canvas').getContext('2d')
    ctx.canvas.width = width
    ctx.canvas.height = height

    this.ctx = ctx
    this.width = width
    this.height = height
    this.borderMargin = borderMargin
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
