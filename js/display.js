export default class Display {
  constructor (containerWidth, containerHeight) {
    this.scoreNode = document.querySelector('.score')
    this.startMenuNode = document.querySelector('.start-menu')
    this.canvasWrapper = document.querySelector('.canvas-wrapper')
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

  drawGame () {
    this.canvasWrapper.style.display = 'block'
    this.scoreNode.style.display = 'block'
    this.startMenuNode.style.display = 'none'
  }

  drawStartMenu () {
    this.startMenuNode.style.display = 'block'
    this.canvasWrapper.style.display = 'none'
    this.scoreNode.style.display = 'none'
  }
}
