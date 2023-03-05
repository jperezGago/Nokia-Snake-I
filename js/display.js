export default class Display {
  constructor (screenWidth, screenHeight) {
    this.menuNode = document.querySelector('.menu')
    this.inGameNode = document.querySelector('.in-game')
    this.finishGameNode = document.querySelector('.finish-game')

    this.drawScreen(screenWidth, screenHeight)
  }

  drawScreen (width, height) {
    const screenNode = document.querySelector('.screen')
    screenNode.style.width = `${width}px`
    screenNode.style.height = `${height}px`
  }

  drawMenu () {
    this.menuNode.style.display = 'flex'
    this.inGameNode.style.display = 'none'
    this.finishGameNode.style.display = 'none'
  }

  drawScore (score) {
    const scoreNode = document.querySelector('.score')
    scoreNode.innerText = score <= 9 ? `0${score}` : score
  }

  drawGame () {
    this.menuNode.style.display = 'none'
    this.inGameNode.style.display = 'block'
    this.finishGameNode.style.display = 'none'
  }

  drawFinishGame (message) {
    this.finishGameCongratsNode = document.querySelector('.finish-game-congrats')
    this.finishGameCongratsNode.innerText = message

    this.menuNode.style.display = 'none'
    this.inGameNode.style.display = 'none'
    this.finishGameNode.style.display = 'flex'
  }
}
