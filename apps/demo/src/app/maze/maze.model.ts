import { Cell } from "../cell/cell.model";

export class Maze
{
  name: string;
  cells: string[][];
  constructor(name: string, contents : string)
  {
    this.cells = contents.split(/[\r\n]+/).map((val: string) => [...val]);
    this.name = name;
  }
}

export const getMazeViewport = (maze: Maze, row: number, col: number): Maze =>
{
  var viewportContents = "";
  for (var r = row - 2; r <= row + 2; r++) {
    var currentRowContents = "";
    if( r < 0 || r >= maze.cells.length){
      // current row is out of bounds - return walls
      currentRowContents = Cell.WALL.repeat(5);
    }else{
      for (var c = col - 2; c <= col + 2; c++) {
        if ( c < 0 || c >= maze.cells[r].length) {
          // current column is out of bounds - return wall
          currentRowContents = currentRowContents.concat(Cell.WALL)
        }else{
          if( c == col && r == row ){
            // put player in center of viewport
            currentRowContents = currentRowContents.concat(Cell.PLAYER);
          }else{
            currentRowContents = currentRowContents.concat(maze.cells[r][c]);
          }
        }
      }
    }
    viewportContents = viewportContents.concat(currentRowContents + '\n');
  }
  return new Maze(maze.name, viewportContents);
}

export const getMazeStart = (maze: Maze) =>
{
  for(var r = 0; r < maze.cells.length; r++) {
    const c = maze.cells[r].indexOf(Cell.START);
    if (c !== -1) {
      return [r, c];
    }
  }
  return [-1, -1]; // no start found
}

export const isValidMazePos = (maze: Maze, row: number, col: number): boolean => {
  if(row < 0 || row >= maze.cells.length){
    return false;
  }else{
    if(col < 0 || col >= maze.cells[row].length){
      return false;
    }
  }
  return true;
}