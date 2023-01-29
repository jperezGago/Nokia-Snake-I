export default class Canvas {
  static ctx = document.querySelector('canvas').getContext('2d')

  static drawRectangule ({ x, y, width, height, fill = true, color = 'black' }) {
    if (fill) {
      this.ctx.fillStyle = color
      this.ctx.fillRect(x, y, width, height)
      return
    }

    this.ctx.strokeStyle = color
    this.ctx.strokeRect(x, y, width, height)
  }

  static clearCanvas () {
    const canvas = document.querySelector('canvas')
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
