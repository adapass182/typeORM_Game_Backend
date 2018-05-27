export const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]
  
export type gameColors = "red" | "yellow" | "blue" | "green" | "magenta"

export const listOfColors: Array<gameColors> = ["red", "blue", "green", "yellow", "magenta"]
export const randomColor = () => listOfColors[Math.floor(Math.random() * listOfColors.length)]
  
export const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length