export default class Display {
  constructor (screenWidth, screenHeight) {
    this.menuNode = document.querySelector('.menu')
    this.inGameNode = document.querySelector('.in-game')

    this.drawScreen(screenWidth, screenHeight)
  }

  drawScreen (width, height) {
    const screenNode = document.querySelector('.screen')
    screenNode.style.width = `${width}px`
    screenNode.style.height = `${height}px`
  }

  drawScore (score) {
    const scoreNode = document.querySelector('.score')
    scoreNode.innerText = score <= 9 ? `0${score}` : score
  }

  drawGame () {
    this.inGameNode.style.display = 'block'
    this.menuNode.style.display = 'none'
  }

  drawMenu () {
    this.menuNode.style.display = 'flex'
    this.inGameNode.style.display = 'none'
  }
}
