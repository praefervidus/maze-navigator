import { CellType } from "../cell/cell.model";

export interface IMaze {
  name?: string | undefined;
  cells?: string[][] | undefined;
}

export class Maze implements IMaze
{
  public name?: string;
  public cells?: string[][];

  constructor(maze?: IMaze) {
    this.cells = maze?.cells ?? null;
    this.name = maze?.name ?? null;
  }
}

export const convertFileToMazeCells = (fileContents: string) =>
  fileContents.split(/[\r\n]+/).map((val: string) => [...val]);

export const getMazeViewport = (maze: Maze, row: number, col: number): Maze => 
{
  var viewportContents = "";
  for (var r = row - 2; r <= row + 2; r++) {
    var currentRowContents = "";
    if( r < 0 || r >= maze.cells.length){
      // current row is out of bounds - return walls
      currentRowContents = CellType.WALL.repeat(5);
    }else{
      for (var c = col - 2; c <= col + 2; c++) {
        if ( c < 0 || c >= maze.cells[r].length) {
          // current column is out of bounds - return wall
          currentRowContents = currentRowContents.concat(CellType.WALL)
        }else{
          if( c == col && r == row ){
            // put player in center of viewport
            currentRowContents = currentRowContents.concat(CellType.PLAYER);
          }else{
            currentRowContents = currentRowContents.concat(maze.cells[r][c]);
          }
        }
      }
    }
    viewportContents = viewportContents.concat(currentRowContents + '\n');
  }
  return new Maze({
    name:   maze.name,
    cells:  convertFileToMazeCells(viewportContents)
  });
}

export const getMazeStart = (maze: Maze) =>
{
  for(var r = 0; r < maze.cells.length; r++) {
    const c = maze.cells[r].indexOf(CellType.START);
    if (c !== -1) {
      return [r, c];
    }
  }
  return [-1, -1]; // no start found
}