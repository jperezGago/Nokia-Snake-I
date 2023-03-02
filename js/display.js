export default class Display {
  constructor (containerWidth, containerHeight) {
    this.scoreNode = document.querySelector('.score')
    this.drawContainer(containerWidth, containerHeight)
  }

  drawScore (score) {
    this.scoreNode.innerText = score <= 9 ? `0${score}` : score
  }

  drawContainer (width, height) {
    const container = document.querySelector('.canvas-container')
    container.style.width = `${width}px`
    container.style.height = `${height}px`
  }
}
