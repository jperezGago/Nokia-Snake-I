export default class Display {
  constructor () {
    this.menuNode = document.querySelector('.menu')
    this.inGameNode = document.querySelector('.in-game')
    this.finishGameNode = document.querySelector('.finish-game')
  }

  drawMenu () {
    this.menuNode.style.display = 'flex'
    this.inGameNode.style.display = 'none'
    this.finishGameNode.style.display = 'none'
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
