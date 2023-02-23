import Canvas from './canvas.js'
import Snake from './snake.js'
import addKeysListener from './keys.js'
import Food from './food.js'

function animate () {
  window.requestAnimationFrame(animate)
  Canvas.clearCanvas()
  snake.update()
  food.update()
}

const food = new Food()
const snake = new Snake(food)

addKeysListener({
  handleLeftKeyPressed: () => snake.setDirection(Snake.DIRECTIONS.LEFT),
  handleRightKetPressed: () => snake.setDirection(Snake.DIRECTIONS.RIGHT)
})
animate()
