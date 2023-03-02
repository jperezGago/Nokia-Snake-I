export default class Display {
  constructor (containerWidth, containerHeight) {
    this.drawContainer(containerWidth, containerHeight)
  }

  drawContainer (width, height) {
    const container = document.querySelector('.canvas-container')
    container.style.width = `${width}px`
    container.style.height = `${height}px`
  }
}
