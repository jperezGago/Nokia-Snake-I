export const DIRECTIONS = {
  NORTH: Symbol('NORTH'),
  SOUTH: Symbol('SOUTH'),
  EAST: Symbol('EAST'),
  WEST: Symbol('WEST')
}
export const FPS = 60

export function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function areBoxesInCollisions (box1, box2) {
  return box1.x + box1.width > box2.x &&
        box1.x < box2.x + box2.width &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y
}
