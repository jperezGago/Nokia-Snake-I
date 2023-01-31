import Canvas from './canvas.js'
import Snake from './snake.js'
import addKeysListener from './keys.js'

function animate () {
  window.requestAnimationFrame(animate)
  Canvas.clearCanvas()
  snake.update()
}

const snake = new Snake()

addKeysListener({
  handleLeftKeyPressed: () => { snake.setDirection(Snake.DIRECTIONS.LEFT) },
  handleRightKetPressed: () => { snake.setDirection(Snake.DIRECTIONS.RIGHT) }
})
animate()
