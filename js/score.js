export default class Score {
  constructor () {
    this.value = 0
  }

  reset () {
    this.value = 0
    this.draw()
  }

  add () {
    this.value += 1
    this.draw()
  }

  draw () {
    const scoreNode = document.querySelector('.score')
    scoreNode.innerText = this.value <= 9 ? `0${this.value}` : this.value
  }
}
