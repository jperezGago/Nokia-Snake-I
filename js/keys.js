const KEYS_CODE = {
  SPACE: 32,
  ENTER: 13,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40
}

export default function addKeysListener ({ handleLeftKeyPressed, handleRightKetPressed }) {
  window.addEventListener('keydown', (event) => {
    if (event.keyCode === KEYS_CODE.LEFT) handleLeftKeyPressed()
    if (event.keyCode === KEYS_CODE.RIGHT) handleRightKetPressed()
  })
}
