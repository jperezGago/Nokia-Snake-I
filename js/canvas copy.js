export default class Canvas {
  // constructor () {
  //   const canvas = document.querySelector('canvas')

  //   this.ctx = canvas.getContext('2d')
  //   this.width = canvas.width
  //   this.height = canvas.height
  // }

  static ctx = document.querySelector('canvas').getContext('2d')

  static drawRectangule (x, y, width, height, color = 'black') {
  // ctx.fillStyle = color
  // ctx.fillRect(x, y, width, height)
    this.ctx.strokeStyle = color
    this.ctx.strokeRect(x, y, width, height)
  }

  static clearCanvas () {
    const canvas = document.querySelector('canvas')
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
