export enum CellType
{
  START   = "S",
  END     = "E",
  PATH    = "O",
  WALL    = "X",
  PLAYER  = "@"
}

export type Cell = "S" | "E" | "O" | "X" | "@";

export const isTraversable = (cell: string): boolean =>
{
  return cell !== CellType.WALL;
}